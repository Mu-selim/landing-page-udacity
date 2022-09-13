/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

// Global variables declaration
const navBox = document.querySelector('.nav-bar-box'),
      listBox = document.querySelector('.list-box'),
      hamgurgerMenuBtn = document.querySelector('.hamgurger-menu'),
      sections = document.querySelectorAll('.section'),
      upBtn = document.querySelector('.up-btn'),
      addSectionBtn = document.querySelector('button');

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
Remove Active|Highlighted Navigation items
also the background of active section 
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
Add Active class to highlight the section
and the navigation item with right posistion
*/
let addHighlight = (id)=> {
    let section = document.getElementById(id),
        listItem = document.getElementById(`${id}-item`);      
    section.classList.add('active');
    listItem.classList.add('active');
}

/*
Adding function which will be used to create
new sections
*/
let createSection = () => {
    let tmp;
    if (counter % 2 === 0) {
        tmp = 'even';
    } else {
        tmp = 'odd';
    }
    tmp = 
    `<section class="section section-${tmp}" id="section${counter}">
        <h2>Section ${counter}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
        <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
    </section>`;
    let sectionsBox = document.querySelector('.sections-box');
    sectionsBox.insertAdjacentHTML('beforeend', tmp);
}

// Initialize|Building Navigation Bar
sections.forEach((_, index) => {
    createNavBarItem(index+1);
});

/*
preventDefault of anchor tag to make navigation between
sections by using js.
*/
const anchor = document.querySelectorAll('.anchor');
anchor.forEach(item => {
    item.addEventListener('click', (event)=> {
        event.preventDefault();
    });
});

/* 
Hamburger menu functionalities, shows and hides
the menu if user clicks.
*/
hamgurgerMenuBtn.addEventListener('click', ()=> {
    listBox.classList.toggle('active');
    hamgurgerMenuBtn.classList.toggle('active');
});

/*
adding UP button functionalities to get back
top of page.
*/
upBtn.addEventListener('click', ()=> {
    // for Safari
    document.body.scrollTop = 0;
    // for Chrome, Firefox, etc....
    document.documentElement.scrollTop = 0;
});

/*
Adiing navigation method to change between different
sections using Navigation bar
*/
let sectionNavigation = ()=> {
    document.querySelectorAll('.list-item').forEach((item, index) => {
        item.addEventListener('click', ()=> {
            let sectionPosition = (sections[0].offsetHeight * (index+1)) + (index * 8); // (index*8) to cover margins
            // for Safari
            document.body.scrollTop = sectionPosition;
            // for Chrome, Firefox, etc....
            document.documentElement.scrollTop = sectionPosition;
            if (listBox.classList.contains('active')) {
                listBox.classList.remove('active');
                hamgurgerMenuBtn.classList.remove('active');
            }
        });
    });
}

// call function to enable navigation
sectionNavigation();

/*
Adding scroll event to detect any movement in
the page and mark it to section and navigation
item.
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
        set timeOut() to check scrolling status and
        remove Navigation bar if no scrolling happened
        */
        timerHandler = setTimeout(() => {
            if ((posistion >= 0 && posistion <= 150) || listBox.classList.contains('active')) {
                navBox.classList.remove('active');
            } else {
                navBox.classList.add('active');
            }
        }, 3000);
    })
});

/*
Adding eventListerner to button
*/
addSectionBtn.addEventListener('click', ()=> {
    createSection(); // creates a new section
    createNavBarItem(counter); // adds a new list items

    // preventDefault from the new anchor element
    let lastAnchor = document.querySelectorAll('.anchor');
    lastAnchor = lastAnchor[lastAnchor.length-1];
    lastAnchor.addEventListener('click', (event)=> {
        event.preventDefault();
    });
    
    sectionNavigation(); // call function to add new item functionalities
});


/*
addEventListener to show navigation bar if needed when there
is no scrolling and it was hidden
*/
window.addEventListener('mousemove', (event)=> {
    let curser = event.y;
    if (curser >= 0 && curser <= 44) {
        navBox.classList.remove('active');
    }
});