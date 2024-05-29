import {Component} from 'react'
import {v4} from 'uuid'
import './index.css'
import CommentItem from '../CommentItem/index'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentsList: [],
  }

  onChangeName = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeComment = event => {
    this.setState({commentInput: event.target.value})
  }

  addComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }
    `
    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      nameInput: '',
      commentInput: '',
      commentsList: [...prevState.commentsList, newComment],
    }))
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = id => {
    const {commentsList} = this.setState
    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== id),
    })
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state
    return (
      <div className="bg-container">
        <div className="app-container">
          <div className="content-container">
            <div>
              <form className="form" onSubmit={this.addComment}>
                <h1 className="heading">Comments</h1>
                <p className="topic">Say something about 4.0 Technologies</p>
                <input
                  type="text"
                  className="name-input"
                  placeholder="Your Name"
                  value={nameInput}
                  onChange={this.onChangeName}
                />{' '}
                <br />
                <textarea
                  className="comment-input"
                  rows={6}
                  cols={35}
                  placeholder="Your Comment"
                  value={commentInput}
                  onChange={this.onChangeComment}
                />{' '}
                <br />
                <button type="submit" className="add-button">
                  Add Comment
                </button>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                className="image"
                alt="comments"
              />
            </div>
          </div>
          <hr className="line" />
          <p className="num-comments">
            <span className="comments-count">{commentsList.length}</span>
            Comments
          </p>
          <ul className="comments-list">
            {commentsList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                commentDetails={eachComment}
                toggleIsLiked={this.toggleIsLiked}
                deleteComment={this.deleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
