import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 12,
    category: 'general'

  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
 capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      page: 1,
      loading: false
    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-News Narayna`;
  }
  async componentDidMount() {
    const url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=54eda8bd58c04a078e279e15ff8c1f14&pageSize=${this.props.pageSize}`
    this.setState({
      loading: true
    })
    let data = await fetch(url)
    let news = await data.json()
    console.log(news)
    this.setState({
      articles: news.articles,
      totalResults: news.totalResults,
      loading: false
    })
  }
  handleNext = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 4)) { }
    else {
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=54eda8bd58c04a078e279e15ff8c1f14&page=${this.state.page + 1
        }&pageSize=${this.props.pageSize}`
      this.setState({
        loading: true
      })
      let data = await fetch(url)
      let news = await data.json()
      console.log(news)
      console.log('next')
      this.setState({
        page: this.state.page + 1,
        articles: news.articles,
        loading: false
      })
    }
  }
  handlePrevious = async () => {
    if (this.state.page <= 1) {
      return 
    }

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=54eda8bd58c04a078e279e15ff8c1f14&page=${this.state.page - 1
      }&pageSize=${this.props.pageSize}`
    this.setState({
      loading: true
    })
    let data = await fetch(url)
    let news = await data.json()
    console.log(news)
    console.log('previous')
    this.setState({
      page: this.state.page - 1,
      articles: news.articles,
      loading: false
    })
  }

  render() {
    return (
      <div className='container'>
        <h2 className='text-center' style={{ margin: ' 20px 0px' }}>{`NewsNaryana -Top ${this.capitalizeFirstLetter(this.props.category)} Headlines`}</h2>
        {this.state.loading && <Spinner />}
        <div className='row'>
          {!this.state.loading && this.state.articles.map(element => {
            return (
              <div className='col-md-3' key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ''}
                  description={element.description ? element.description.slice(0, 88) : ''}
                  urlToImage={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            )
          })}
        </div>
        <div className=' container  d-flex justify-content-between'>
          <button
            type='button'
            disabled={this.state.page <= 1}
            className='btn btn-dark'
            onClick={this.handlePrevious}
          >
            &larr; Previous
          </button>
          <button type='button' disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className='btn btn-dark' onClick={this.handleNext}>
            Next &rarr;
          </button>
        </div>
      </div>
    )
  }
}

export default News
