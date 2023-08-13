// a test suite is a group or collection of individual test cases that are related to the same entity (in this case, the app). Conventionally one would have one test suite per file, only exception is if you have multiple things in a file and you want to test each of them individually, whereby you would have multiple test suites for a file. or if you have a particularly complex component, and lots of unit tests / test cases need to be made for multiple different scenario. then you might allocate a scenario to a test suite. nesting test suites is also possible

//vitest will automatically import the functions because the test framework (vitest) will do that for us automatically

//define test suite with 'describe'
//define the test with 'it' in the callback function, within which should reside a string that describes what its testing. Should make grammatical sense in english following 'it'
//must give 'describe' a name, typically the name of the component
// You can test for seed data (hardcoded), but you cant test dynamic content.

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect} from 'vitest'
import userEvent from '@testing-library/user-event'

//test case 1
describe("App Component", () => {
    let container

    beforeEach(() => {
        container = render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
            ).container
    })

    it("Renders the Home component", () => {
        
   
    expect(container.querySelector('h2')).not.toBeNull() //check to see that h2 element is not null, ie does exist
    //by using container (which is an HTML element), you can use any of the normal dom query methods such as querySelector
    expect(container.querySelector('h2')).toHaveTextContent('Journal Entries')
        // expect(screen.getByRole('heading', { level: 2})).toHaveTextContent('Journal Entries') //screen object is the virtual dom, and the method following it is able to query that virtual dom. getbyRole returns an html element. following that we add a method to assert what it returns, in the case above, toHaveTextContent. if the passed in value is found, it will pass the test, if it is wrong, it will fail, but it will also display what is found instead.
    //each HTML element or attribute (or combination) has a corresponding role, found at https://www.w3.org/TR/html-aria/#docconformance
    })


//test case 2: testing to see if, when a user clicks on 'new entry' that the category selection component is rendered
    it("Renders CategorySelection component when 'New Entry' is clicked", async () => {
        
    await userEvent.click(screen.getByText('New Entry'))

    expect(container.querySelector('h3')).not.toBeNull()
    expect(container.querySelector('h3')).toHaveTextContent('Please select a category:')
    })
}) 

