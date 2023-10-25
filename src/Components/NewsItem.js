import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title,description,urlToImage,url,author,date,source} = this.props;
    return (
      <div className='my-4'>
        <div className="card" >
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-secondary" style={{zIndex:'1',left:'90%'}}>
   {source}
    </span>
          <img src={urlToImage?urlToImage:"https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg"} className="card-img-top" alt="..." style={{ maxHeight: "200px" }} />
          <div className="card-body">
            <h5 className="card-title" style={{ fontSize: "1.25rem" }}>{title}...</h5>
            <p className="card-text" style={{ fontSize: "1rem" }}>{description}...</p>
            <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer"  href={url}  target='_blank' className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    );
    
  }
}

export default NewsItem
