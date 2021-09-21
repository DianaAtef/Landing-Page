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

/**
 * Define Global Variables
 * 
 */

Sections_Array = document.querySelectorAll('section');
Navbar_List = document.querySelector('#navbar__list');


/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

/**
 * Helper Function_1
 * Name       : CheckForActiveSection
 * Descrption : helper fuction to check which section
 * is acive on screen i'll use it to mark the active section
 */

function CheckForActiveSection() {

    let Act_Section = Sections_Array[0];
    TopValue = 400;
    for (let section of Sections_Array) {

        let Sec_Bounding = section.getBoundingClientRect();
        //console.log(Sec_Bounding.top); --> for debugging
        if (Sec_Bounding.top < TopValue & Sec_Bounding.top > -200) {
            TopValue = Sec_Bounding.top;
            Act_Section = section;
            return Act_Section;
        } else {
            Act_Section = 1;
        }
    };
    /**
     * // For Debuging only
     *console.log(`Check For Active Section : Debuging Message -> ${Act_Section.id}is Active`);
     */
    //console.log(Act_Section);
    return Act_Section;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav
function NavbarBuild() {
    //let i = 1; for debugging
    for (let section of Sections_Array) {
        let NavbarItem = document.createElement('li');
        NavbarItem.innerHTML = section.dataset.nav;
        NavbarItem.dataset.nav = section.id;
        NavbarItem.className = 'menu__link';
        Navbar_List.appendChild(NavbarItem);
        /**
         * // For Debuging only
         *console.log(`NavbarBuild Function : Debuging Message ${i++} -> `);
         *console.log(NavbarItem);
         *
         */
    };
};

// Add class 'active' to section when near top of viewport
function AddClassActive() {

    window.addEventListener('scroll', function (EventListener) {



        let Act_Section = CheckForActiveSection();
        const NavbarItems = document.querySelectorAll('.menu__link');
        if (Act_Section != 1) {
            const Act_NavbarItem = document.querySelector(`li[data-nav=${Act_Section.id}]`);
            Act_Section.classList.add('your-active-class');

            Act_NavbarItem.classList.add('NavbarItem-active-link');

            for (let section of Sections_Array) {
                if (section.id != Act_Section.id & section.classList.contains('your-active-class')) {
                    section.classList.remove('your-active-class');

                } else {
                    /**
                     * // For Debuging only
                     *    console.log(`AddClassActive Function : Debuging Message -> ${section.id}  is Active class`);
                     */
                }
            }


            for (let NavbarItem of NavbarItems) {
                if (NavbarItem.dataset.nav != Act_NavbarItem.dataset.nav & NavbarItem.classList.contains('NavbarItem-active-link')) {
                    NavbarItem.classList.remove('NavbarItem-active-link');
                } else {
                    /**
                     * // For Debuging only
                     * console.log(`AddClassActive Function _Link_ : Debuging Message -> ${NavbarItem.dataset.nav}  is Active nav link`);
                     */

                }
            };

        } else {
            for (let s of Sections_Array) {
                s.classList.remove('your-active-class');
            }


            for (let Nav of NavbarItems) {
                Nav.classList.remove('NavbarItem-active-link');
            }
        }

    });
};

// Scroll to anchor ID using scrollTO event

function ScrollToAnchorID() {
    Navbar_List.addEventListener('click', function (EventListener) {
        const NavbarLink = document.querySelector(`#${EventListener.target.dataset.nav}`)
        NavbarLink.scrollIntoView();
    });
};
/**
 * End Main Functions
 * Begin Events
 * 
 */

// Build menu 
NavbarBuild();
// Scroll to section on link click
ScrollToAnchorID();
// Set sections as active
AddClassActive();
