import React, { Component } from "react";
import api from "../../services/api";
import "./style.css";
import { Link } from 'react-router-dom'
import banner from "../../images/banner.png";

export default class Main extends Component {
	state = {
		products: [],
		productInfo: {},
		page: 1,
	};

	componentDidMount() {
		this.loadProducts();
	}

	loadProducts = async (page = 1) => {
		const response = await api.get(`/products?page=${page}`);
		const { docs, ...productInfo } = response.data;
		this.setState({ products: docs, productInfo, page });
	};

	prevPage = () => {
		const {page, productInfo} = this.state;
		if (page === 1) return;
		const pageNumber = page - 1;
		this.loadProducts(pageNumber);
	};

	nextPage = () => {
		const {page, productInfo} = this.state;
		if (page == productInfo.pages) return;
		const pageNumber = page + 1;
		this.loadProducts(pageNumber);
	};




	render() {
		const { products, page, productInfo } = this.state;
		return (
		<div>
		<div>
			<img src={banner} alt="banner" className="banner" />
			<p className="info">Aumente as suas habilidades em tecnologia usando a auto-educação, oferecemos o material ideal para o seu aprendizado e você estuda no seu ritmo e no seu tempo. Escolha abaixo umas das opções e bons estudos!</p>
		</div>
		<div className="product-list">
			{products.map(product => (
				<article key={product._id}>
				<strong className="title">{product.title}</strong>
				<p>{product.description}</p>
				<Link to={`/products/${product._id}`}>Acessar</Link>
				</article>
			))}
			<div className="actions">
				<button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
				<button disabled={page === productInfo.pages} onClick={this.nextPage}>Próximo</button>
			</div>
		</div>
		</div>
			);
	}
}