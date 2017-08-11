import React from 'react'
import './App.css'
import Note from './Note'

var Board = React.createClass({
    propTypes: {
        count: function(props, propName) {
            if (typeof props[propName] !== "number") {
                return new Error("the count must be a number")
            }

            if (props[propName] > 100) {
                return new Error ('Creating ' + props[propName] + ' notes is ridiculous')
            }
        }
    },
    getInitialState () {
        return {
            notes: []
        }
    },
    componentWillMount() {
    	this.add('New Note');
    },
    nextId() {
      this.uniqueId = this.uniqueId || 0
      return this.uniqueId++
    },
    add(text) {
      var notes = [
        //This first item uses the spread operator to fill this array with the notes that already exist in state.
        ...this.state.notes,
        //This second array item is an object with an id and note values. id needs it's own method to handle the creation of a new id. So, we wrote the method above, "nextId," to set a var equal to itself if it has a value, or 0 if it doesn't yet have a value. This value is then incremented. So, when add() runs it makes a copy of all the existing notes in state. Then, it creates another one at the end of the array as another JS object with id and note keys. However, the value for its id key is determined by whatever number the "nextId()" method is incremented to in this particular instance. Pretty sure the lowest id value possible is 1.
        {
          id: this.nextId(),
          note: text
        }
      ]
      this.setState({notes})
      console.log("New note created.");
    },
    //Basically, this update function takes in newText and an id; The var notes is then created and set equal to an array created by the map function; it maps over the array of note objects stored inside of Board's state object and performs one of the following operations on each note object in the array: either A) returns the same note object if its id is not equal to the note that has been edited, effectively doing nothing to iterable object, or B) Returns a new object, that is first pushed all of the keys and values of the original (using the spread operator, which is what looks like ellipses here);, then it alters the value of the note key of this new object to be equal to whatever newText is equal to. Essentially, it returns a copy of the original note but then alters what that note says. So, ultimately, after update() runs, we end up with a new array stored inside of update.notes that contains either carbon copies of the objects inside of this.state.notes OR a new version of the same object with same id but different text. Possibly what seems the most confusing is the use of the ternary if statement (here, "note :" looks like you are setting a key value, not returning the unchanged note object) and the arrow function. Once the mapping has been completed, this.setState is pushed the array in update.notes (the updated objects), which then re-calls the render function that alters how the note is displayed.

    update(newText, id) {
        var notes = this.state.notes.map(
            note => (note.id !== id) ? 
                                note :
                                {
                                  ...note,
                                  note: newText
                                }
        )
        this.setState({notes})
    },

    remove(id) {
        //Filter is native to JS, copies the array handed to it (in this case, this.state.notes) and only returns objects if the logical test it expects as an argument is passed. So we're handing remove() an id, then remove() finds the note with the id equal to the one we want to remove, then creates a new array without that note in it. This new array is then passed to this.setState, altering this.state.notes and triggering render once again. -->

        var notes = this.state.notes.filter(note => note.id !== id);
        this.setState({notes});
    },
    eachNote (note) {
        return (<Note key={note.id}
                      id={note.id}
                      onChange={this.update}
                      onRemove={this.remove}>
                    {note.note}
                </Note>)
                //The use of "note.note" is confusing because it first refers to the argument taken in by this "eachNote" function called "note." Because this refers to the note object, which has keys, the second "note" refers to the text held inside of the object's key called "note."
    },

    render () {
        // "this.eachNote" simply returns each note
        return (<div className="board">
            {this.state.notes.map(this.eachNote)}
            <button onClick={() => this.add('New Note')}>+</button>
        </div>)
    }
});

export default Board
