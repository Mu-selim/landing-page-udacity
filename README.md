# Landing Page Project

## Table of Contents

* [Introduction](#introduction)
* [Architure](#architure)
* [HTML Structure](#html-structure)
* [Styling](#styling)
* [Dynamics with JavaScript](#dynamics-with-javascript)

## Introduction

**Landing page** is the first project in [**FWD**](https://egfwd.com/) professional web program to apply the knowledge of JavaScript and the Document Object Model (DOM) by buliding a multi-section page with a dynamically navigation menu.

This project serves two purposes:
- preparing for appending dynamically added data to the DOM.
- showing that JavaScript can improve the interactivity of a static website.

## Architure

* **css** :
  * [styles.css](css/styles.css)
*  [index.html](index.html)
* **js** :
  * [app.js](js/app.js)
* [README.md](README.md)

## HTML Structure

The project contains the following:
* a navigation menu with hamburger style.
* view section with a header and a "Add Section" button to add more sections.
* 4 sections at the beginning and can be increased.
* footer of the page.

## Styling

* page scroll behaviour is smooth.
* Hamburger menu comes top in small screen sizes and disappears when screen width is big.
* CSS class is set active state when the element is in the viewport.
* The active section in the navigation bar is highlighted.
* Responsive design is made using media query.

## Dynamics with JavaScript
* [Link script file](#link-script-file)
* [Build the navigation menu](#build-the-navigation-menu)
* [distinguish the section in view](#distinguish-the-section-in-view)
* [Add the functionality to scroll to sections](#add-the-functionality-to-scroll-to-sections)
* [Add new section](#add-new-section)
* [Hide navigation menu while not scrolling](#hide-navigation-menu-while-not-scrolling)
* [Show the navigation menu](#show-the-navigation-menu)
* [Scroll to the top button](#scroll-to-the-top-button)


### **Link script file**

JavaScript file was linked in the structure file [index.html](index.html)
> `<script src="js/app.js" defer></script>`

### **Build the navigation menu**

This will dynamically create a navigation menu based on the sections of the page.
``` javascript
let createNavBarItem = (i) => {
    let element = `<li class="list-item" id="section${i}-item"><a class="anchor" href="">Section${i}</a></li>`;
    listBox.insertAdjacentHTML('beforeend', element);
    counter += 1; // it counts the sections current number
}
```

### **Distinguish the section in view**

While navigating through the page, the section that is active in the viewport/closest to the top will be distinguished from the other sections.
``` javascript
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
    }
});
```
Remove highLisghted with the following function:
``` javascript
let removeHighlighted = () => {
    document.querySelectorAll('.list-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelectorAll('.section').forEach(item => {
        item.classList.remove('active');
    });
}
```
Highlight the active in the viewpoint with the following function:
``` javascript
let removeHighlighted = () => {
    document.querySelectorAll('.list-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelectorAll('.section').forEach(item => {
        item.classList.remove('active');
    });
}
```

### **Add the functionality to scroll to sections**

Clicking on a navigation item should scroll to the appropriate section of the page.
``` javascript
let sectionNavigation = ()=> {
    document.querySelectorAll('.list-item').forEach((item, index) => {
        item.addEventListener('click', ()=> {
            // calculates the perfect position of section.
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
```

### **Add new section**
when "Add section" button is click a new section is added and a new list item is added too.
``` javascript
// Create Navigation Bar list item method
let createNavBarItem = (i) => {
    let element = `<li class="list-item" id="section${i}-item"><a class="anchor" href="">Section${i}</a></li>`;
    listBox.insertAdjacentHTML('beforeend', element);
    counter += 1; // it counts the sections current number
}
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

addSectionBtn.addEventListener('click', ()=> {
    createSection(); // creates a new section
    createNavBarItem(counter); // adds a new list items
});
```

### **Hide navigation menu while not scrolling**
the navigation menu will be hiden if user stop scrolling for 3 seconds.
``` javascript
window.addEventListener('scroll', ()=> {

    let posistion = document.body.scrollTop; /* get top Y position of page */
    let timerHandler;

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
```

### **Show the navigation menu**
if the navigation menu was hiden and mouse moves to the top [0px : 44px] of screen then the naviagtion menu will be back.
``` javascript
window.addEventListener('mousemove', (event)=> {
    let curser = event.y;
    if (curser >= 0 && curser <= 44) {
        navBox.classList.remove('active');
    }
});
```

### **Scroll to the top button**
when "Up" button is clicked the page will move to the top of the page.
``` javascript
upBtn.addEventListener('click', ()=> {
    // for Safari
    document.body.scrollTop = 0;
    // for Chrome, Firefox, etc....
    document.documentElement.scrollTop = 0;
});
```