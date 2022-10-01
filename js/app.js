/**
 * 
 * TODO: Manipulating the DOM.
 * TODO: Creating Navigation list dynanically based on the number of sections.
 * TODO: Highlighting the section in viewpoint and the list item upon scrolling dynamically.
 * TODO: Adding a new section and a list item when "Add Section" button is clicked.
 * TODO: Hiding navigation bar when the user stop scrolling.
 * TODO: Dealing with 'scroll', 'mouse', and 'addEventListener' events.
 * TODO: Showing navigation bar if mouse moves to the top of screen.
 * TODO: Scrolling to the top of the page if "up" button is clicked.
 * 
 * * Dependencies: None
 * * JS Version: ES2015/ES6
*/

// Global variables declaration
const navBox = document.querySelector('.nav-bar-box'),
      listBox = document.querySelector('.list-box'),
      hamgurgerMenuBtn = document.querySelector('.hamgurger-menu'),
      sections = document.querySelectorAll('.section'),
      upBtn = document.querySelector('.up-btn'),
      addSectionBtn = document.querySelector('button');

/*
 * counter: counts the number of sections available in the page
 * timerHandler: is used to clear setTimeout()
 */
let counter = 1,
    timerHandler;
// End Global variables

// Create Navigation Bar list item method
let createNavBarItem = (i) => {
    let element = `<li class="list-item" id="section${i}-item"><a class="anchor" href="">Section${i}</a></li>`;
    listBox.insertAdjacentHTML('beforeend', element);
    counter += 1; // it counts the sections current number
}

/* 
 * Remove Active|Highlighted Navigation items
 * also the background of active sections.
 */
let removeHighlighted = () => {
    document.querySelectorAll('.list-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelectorAll('.section').forEach(item => {
        item.classList.remove('active');
    });
}

/*
 * Add Active class to highlight the section
 * and the navigation item with right posistion
 */
let addHighlight = (id)=> {
    let section = document.getElementById(id),
        listItem = document.getElementById(`${id}-item`);      
    section.classList.add('active');
    listItem.classList.add('active');
}

/*
 * Adding function which will be used to create
 * new sections
 */
let createSection = () => {
    let element = 
    `<section class="section" id="section${counter}">
        <h2>Section ${counter}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
        <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
    </section>`;
    let sectionsBox = document.querySelector('.sections-box');
    sectionsBox.insertAdjacentHTML('beforeend', element);
}

// Initialize|Building Navigation Bar
sections.forEach((_, index) => {
    createNavBarItem(index+1);
});

/*
 * preventDefault of anchor tag to make navigation between
 * sections done by using js.
 */
const anchor = document.querySelectorAll('.anchor');
anchor.forEach(item => {
    item.addEventListener('click', (event)=> {
        event.preventDefault();
    });
});

/* 
 * Hamburger menu functionalities, shows and hides
 * the menu if user clicks.
 */
hamgurgerMenuBtn.addEventListener('click', ()=> {
    listBox.classList.toggle('active');
    hamgurgerMenuBtn.classList.toggle('active');
});

/*
 * adding UP button functionalities to get back
 * top of page.
 */
upBtn.addEventListener('click', ()=> {
    document.querySelector('.start-view-box').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

/*
 * Adiing navigation method to change between different
 * sections using Navigation bar
 */
let sectionStartNavigation = (id)=> {
    document.getElementById(`section${id}-item`).addEventListener('click', ()=> {
        let element = document.getElementById(`section${id}`);
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        if (listBox.classList.contains('active')) {
            listBox.classList.remove('active');
            hamgurgerMenuBtn.classList.remove('active');
        }
    });
}

// call function to enable navigation of the added list Items.
for(let i = 1; i <= 4; i++) {
    sectionStartNavigation(i);
}

/*
 * Adding scroll event to detect any movement in
 * the page and mark it to section and navigation
 * item.
 */
window.addEventListener('scroll', ()=> {

    let posistion = document.body.scrollTop, /* get top Y position of page */
        sectionGroup = document.querySelectorAll('.section'); /* get all sections and the new ones if were added */
    
    sectionGroup.forEach(item => {
        let sectionStartPosition = item.offsetTop,
            sectionHeight = item.offsetHeight;
        
        // change highlighted a bit before reach section
        if (posistion > (sectionStartPosition - sectionHeight*0.6)) {
            let value = item.attributes.id.value;
            removeHighlighted();
            addHighlight(value);
            if(!upBtn.classList.contains('active')) {
                upBtn.classList.add('active');
            }
        }
    });

    // get height of header to calculate new to remove highlighted and UP button
    let header = document.querySelector('.start-view-box');
    header = header.offsetHeight;
    if (posistion >= 0 && posistion <= (header*0.6)) {
        removeHighlighted();
        upBtn.classList.remove('active');
    }

    // If there is a scroll it will clear timeOut() method
    clearTimeout(timerHandler);
    navBox.classList.remove('active');

    /*
     * set timeOut() to check scrolling status and
     * remove Navigation bar if no scrolling happened with 
     * 3 seconds delay.
     */
    timerHandler = setTimeout(() => {
        if ((posistion >= 0 && posistion <= 150) || listBox.classList.contains('active')) {
            navBox.classList.remove('active');
        } else {
            navBox.classList.add('active');
        }
    }, 3000);
    
});

/*
 * Adding eventListerner to "Add Section" button.
 */
addSectionBtn.addEventListener('click', ()=> {
    createSection(); // creates a new section
    createNavBarItem(counter); // adds a new list items

    // preventDefault of the new anchor element.
    let lastAnchor = document.querySelectorAll('.anchor');
    lastAnchor = lastAnchor[lastAnchor.length-1];
    lastAnchor.addEventListener('click', (event)=> {
        event.preventDefault();
    });
    
    sectionStartNavigation(counter-1); // call function to add new item functionalities
});


/*
 * addEventListener to show navigation bar if needed when there
 * is no scrolling and it was hidden when the mouse is in the top
 * of the screen [the height 44px of navigation bar].
 */
window.addEventListener('mousemove', (event)=> {
    let curser = event.y;
    if (curser >= 0 && curser <= 44) {
        navBox.classList.remove('active');
    }
});