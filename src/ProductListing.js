import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import './ProductListing.css';
import { Container, Button } from '@material-ui/core';
import ItemsCarousel from 'react-items-carousel';
import scanimage from './scan-image.jpg';

const noOfItems = 7;
const noOfCards = 4;
const chevronWidth = 60;

export default class ProductListing extends React.Component{
   

    constructor(props){
        super(props);
        this.state = {data:[],detailData:[],showDetails:false}
        this.baseState = this.state;
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    loadData(){
        fetch(this.props.url,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({data: data})
        })
        .catch(err => console.error(this.props.url, err.toString()))
    }

    handleItemClick(e){
        let url = "https://74k4rzrsqubz5ma3f-mock.stoplight-proxy.io/api/v1/images?id="+e.currentTarget.dataset.id;
        fetch(url,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({detailData: data,showDetails:true});
        })
        .catch(err => console.error(url, err.toString()))
    }

    componentDidMount(){
        this.loadData();
    }

    render(){
        return(   
           <div>
            <h1>Images</h1>
            <Container className="productlisting">   
                <ItemsCarousel
                infiniteLoop={false}
                numberOfCards={noOfCards}
                showSlither={false}
                leftChevron={'<'}
                rightChevron={'>'}
                activeItemIndex={this.state.activeItemIndex}>

                {this.state.data.map((item, i) => (
                    <Card className="card" variant="outlined" data-id={item.id} onClick={this.handleItemClick}>
                    <CardMedia image={item.url} title={item.title} className="media"/>  
                    <CardHeader title={item.title}/>
                    </Card>
                 ))
                 }
                </ItemsCarousel>
            </Container>
          
          <div className={this.state.showDetails ? 'show' : 'hide'}>
            <h1>Detail</h1>
            <Container className="productdetails">
                <CardMedia image={this.state.detailData.url} title={this.state.detailData.title} className="productimg"/>
                <CardHeader title={this.state.detailData.title} className="producttitle"/>
                <Typography component="p" className="productqty">Quantity: <strong>{this.state.detailData.quantity}</strong></Typography> 
                <CardContent>
                    <Typography component="p" className="productdesc"><strong>Description:</strong><br/>{this.state.detailData.description}</Typography>
                    <Typography component="ul" className="productfeat"><strong>Features:</strong><br/>
                        {this.state.detailData.features}
                    </Typography>
                </CardContent>
                <br/>
                <Button variant="contained" color="secondary">SCAN NOW</Button>
            </Container>
            </div>

            <Container className="scanner">
                 <CardMedia className="scan-img" image={scanimage}/>
            </Container>
          </div>
        );
    }
}

