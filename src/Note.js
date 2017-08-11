import React from 'react'
import './App.css'
import Draggable from 'react-draggable'

var Note = React.createClass({
    getInitialState() {
        return {editing: false}
    },
    componentWillMount() {
      this.style = {
        right: this.randomBetween(0, window.innerWidth - 150, 'px'),
        top: this.randomBetween(0, window.innerHeight -150, 'px')
      }
    },
    //This lifecycle method is called when render() is re-called, but only runs if the note is in editing mode. It focuses on the text area and selects the text within it.
    componentDidUpdate() {
      if (this.state.editing){
        this.refs.newText.focus()
        this.refs.newText.select()
      }
    },
    //This lifecycle method is an optimization performance tool. It will check to see if a property or state change has occurred. If it has, then the component will update, or "re-render." If no change has occurred, then it won't update/re-render. Prevents unnecessary re-rendering and makes applications faster. 
    shouldComponentUpdate(nextProps, nextState) {
      return this.props.children !== nextProps.children || this.state !==nextState
    },
    randomBetween(x, y, s) {
      //randomBetween returns a random whole number between the x and y values of the screen. It takes in x for the x axis value, y for the y axis value, and s for the units. 
      return (x + Math.ceil(Math.random() * (y-x))) + s
    },
    edit() {
        this.setState({editing: true})
    },
    save () {
        this.props.onChange(this.refs.newText.value, this.props.id)
        this.setState({editing: false})
    },
    remove() {
        this.props.onRemove(this.props.id)
    },
    renderForm () {
        return(
            <div className="note"
                 style={this.style}>
                <textarea ref="newText"
                          defaultValue={this.props.children}>
                </textarea>
                <button onClick={this.save}>SAVE</button>
            </div>
        )
    },
    renderDisplay (){
        return(
           <div className="note"
                style={this.style}>
            <p>{this.props.children}</p>
            <span>
                <button onClick={this.edit}>EDIT</button>
                <button onClick={this.remove}>X</button>
            </span>
           </div>
        )
    },
    render() {
       return( <Draggable>
        {(this.state.editing) ? this.renderForm() 
                             : this.renderDisplay()}
        </Draggable>
        )
    }
})

export default Note