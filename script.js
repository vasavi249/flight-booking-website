/* ==========================================================================
   FLIGHT BOOKING WEBSITE - GLOBAL JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    initMockData();
    initToasts();
    
    // Page specific initializations
    if (document.getElementById('home-page')) initHomePage();
    if (document.getElementById('flights-page')) initFlightsPage();
    if (document.getElementById('seat-page')) initSeatSelection();
    if (document.getElementById('booking-page')) initBookingPage();
    if (document.getElementById('my-bookings-page')) initMyBookingsPage();
    if (document.getElementById('offers-page')) initOffersPage();
    if (document.getElementById('flight-details-page')) initFlightDetailsPage();
    if (document.getElementById('flight-details-page')) initFlightDetailsPage();
    if (document.getElementById('schedule-page')) initSchedulePage();
    
    initAnimations();
    initAdvancedAnimations();
    initUXComponents();
});

/* ==========================================================================
   ADVANCED ANIMATIONS (INTERSECTION OBSERVER)
   ========================================================================== */
function initAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-zoom-in, .animate-slide-left, .animate-slide-right');
    animatedElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   THEME MANAGEMENT (DARK/LIGHT MODE)
   ========================================================================== */
function initTheme() {
    const themeToggleBtn = document.querySelector('.theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        if(themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    if(themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            }
        });
    }
}

/* ==========================================================================
   NAVIGATION & UI
   ========================================================================== */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if(navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    if(hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    initBackToTop();
}

/* ==========================================================================
   TOAST NOTIFICATIONS
   ========================================================================== */
function initToasts() {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
}

window.showToast = function(message, type = 'success') {
    const container = document.querySelector('.toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    
    container.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

/* ==========================================================================
   MOCK DATA GENERATION
   ========================================================================== */
function initMockData() {
    if (!localStorage.getItem('flights')) {
        const airlines = ['Emirates', 'Qatar Airways', 'Singapore Airlines', 'Etihad', 'Air India'];
        const logos = {
            'Emirates': 'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=50&h=50&fit=crop', // Placeholder for logo
            'Qatar Airways': 'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=50&h=50&fit=crop',
            'Singapore Airlines': 'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=50&h=50&fit=crop',
            'Etihad': 'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=50&h=50&fit=crop',
            'Air India': 'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=50&h=50&fit=crop'
        };
        const airports = ['DXB', 'LHR', 'JFK', 'SIN', 'BOM', 'CDG', 'SYD', 'NRT'];
        
        let mockFlights = [];
        for (let i = 0; i < 25; i++) {
            const airline = airlines[Math.floor(Math.random() * airlines.length)];
            const from = airports[Math.floor(Math.random() * airports.length)];
            let to = airports[Math.floor(Math.random() * airports.length)];
            while (from === to) to = airports[Math.floor(Math.random() * airports.length)];
            
            const hours = Math.floor(Math.random() * 12) + 2;
            const price = Math.floor(Math.random() * 800) + 200;
            const stops = Math.floor(Math.random() * 3);
            
            mockFlights.push({
                id: `FL${1000 + i}`,
                airline: airline,
                logo: logos[airline],
                from: from,
                to: to,
                departureTime: `${Math.floor(Math.random() * 14) + 6}:00`,
                arrivalTime: `${Math.floor(Math.random() * 14) + 6 + hours % 24}:00`,
                duration: `${hours}h ${Math.floor(Math.random() * 60)}m`,
                price: price,
                stops: stops,
                seats: Math.floor(Math.random() * 50) + 1
            });
        }
        localStorage.setItem('flights', JSON.stringify(mockFlights));
    }
    
    if (!localStorage.getItem('bookingHistory')) {
        const dummyBookings = [
            {
                bookingId: 'BKG' + Math.floor(Math.random() * 1000000),
                name: 'John Doe',
                email: 'john@example.com',
                phone: '+1 555 0198',
                flightId: 'FL1005',
                seats: '12A',
                date: new Date().toLocaleDateString(),
                status: 'Confirmed'
            },
            {
                bookingId: 'BKG' + Math.floor(Math.random() * 1000000),
                name: 'Sarah Smith',
                email: 'sarah@example.com',
                phone: '+44 7700 900077',
                flightId: 'FL1012',
                seats: '4C, 4D',
                date: new Date(Date.now() - 86400000 * 2).toLocaleDateString(),
                status: 'Confirmed'
            }
        ];
        localStorage.setItem('bookingHistory', JSON.stringify(dummyBookings));
    }
}

/* ==========================================================================
   PAGE: HOME
   ========================================================================== */
function initHomePage() {
    const searchForm = document.getElementById('flight-search-form');
    if(searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const from = document.getElementById('from').value;
            const to = document.getElementById('to').value;
            const date = document.getElementById('departure').value;
            
            if(!from || !to || !date) {
                window.showToast('Please fill all required fields', 'error');
                return;
            }
            
            const searchParams = { from, to, date };
            localStorage.setItem('recentSearch', JSON.stringify(searchParams));
            
            // Show loader then redirect
            document.querySelector('.loader-wrapper').classList.remove('hidden');
            setTimeout(() => {
                window.location.href = 'pages/flights.html';
            }, 1500);
        });
        
        // Date validation: can't select past dates
        const dateInput = document.getElementById('departure');
        const returnInput = document.getElementById('return');
        if(dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
            
            dateInput.addEventListener('change', () => {
                if(returnInput) returnInput.setAttribute('min', dateInput.value);
            });
        }
    }
}

/* ==========================================================================
   PAGE: FLIGHTS SEARCH RESULTS
   ========================================================================== */
function initFlightsPage() {
    const flights = JSON.parse(localStorage.getItem('flights')) || [];
    const container = document.getElementById('flights-container');
    
    function renderFlights(flightsToRender) {
        if(!container) return;
        container.innerHTML = '';
        
        if(flightsToRender.length === 0) {
            container.innerHTML = '<p class="text-center">No flights found matching your criteria.</p>';
            return;
        }
        
        flightsToRender.forEach(flight => {
            const stopText = flight.stops === 0 ? 'Non-stop' : `${flight.stops} Stop(s)`;
            const card = document.createElement('div');
            card.className = 'card flight-card animate-fade-in';
            card.innerHTML = `
                <div class="airline-info">
                    <img src="${flight.logo}" alt="${flight.airline}" class="airline-logo">
                    <div>
                        <h4 style="color: var(--text-primary)">${flight.airline}</h4>
                        <span style="color: var(--text-secondary); font-size: 0.9rem">${flight.id}</span>
                    </div>
                </div>
                <div class="flight-time-info">
                    <div>
                        <h3 style="color: var(--text-primary)">${flight.departureTime}</h3>
                        <span style="color: var(--text-secondary)">${flight.from}</span>
                    </div>
                    <div class="flight-line">
                        <span style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-size: 0.8rem; color: var(--text-secondary); white-space: nowrap;">${flight.duration}</span>
                        <span style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); font-size: 0.8rem; color: var(--text-secondary); white-space: nowrap;">${stopText}</span>
                    </div>
                    <div>
                        <h3 style="color: var(--text-primary)">${flight.arrivalTime}</h3>
                        <span style="color: var(--text-secondary)">${flight.to}</span>
                    </div>
                </div>
                <div class="flight-price-info">
                    <h2 style="color: var(--secondary-color); font-size: 2rem;">₹${flight.price}</h2>
                    <span style="color: var(--success-color); font-size: 0.9rem;">${flight.seats} seats left</span>
                    <button class="btn btn-primary" onclick="selectFlight('${flight.id}')">Book Now</button>
                    <button class="btn btn-outline" style="padding: 0.5rem" onclick="toggleFavorite('${flight.id}', this)"><i class="fa-regular fa-heart"></i></button>
                </div>
            `;
            container.appendChild(card);
        });
    }

    renderFlights(flights);
    
    // Sort logic
    const sortSelect = document.getElementById('sort-flights');
    if(sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            applyFiltersAndSort();
        });
    }

    // Filter logic
    const filterCheckboxes = document.querySelectorAll('aside input[type="checkbox"]');
    filterCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            applyFiltersAndSort();
        });
    });

    function applyFiltersAndSort() {
        let filtered = [...flights];
        
        // Stops Filter
        const stopFilters = Array.from(document.querySelectorAll('aside input[data-filter="stops"]:checked')).map(cb => parseInt(cb.value));
        if(stopFilters.length > 0) {
            filtered = filtered.filter(f => stopFilters.includes(f.stops >= 2 ? 2 : f.stops));
        }

        // Airline Filter
        const airlineFilters = Array.from(document.querySelectorAll('aside input[data-filter="airline"]:checked')).map(cb => cb.value);
        if(airlineFilters.length > 0) {
            filtered = filtered.filter(f => airlineFilters.includes(f.airline));
        }

        // Apply sort
        const sortVal = sortSelect ? sortSelect.value : '';
        if(sortVal === 'price-low') filtered.sort((a,b) => a.price - b.price);
        if(sortVal === 'price-high') filtered.sort((a,b) => b.price - a.price);
        if(sortVal === 'fastest') filtered.sort((a,b) => parseInt(a.duration) - parseInt(b.duration)); // basic fast sort
        
        renderFlights(filtered);
    }
}

window.selectFlight = function(id) {
    localStorage.setItem('selectedFlightId', id);
    window.location.href = 'flight-details.html';
};

window.toggleFavorite = function(id, btn) {
    const icon = btn.querySelector('i');
    if(icon.classList.contains('fa-regular')) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
        window.showToast('Added to favorites!');
    } else {
        icon.classList.add('fa-regular');
        icon.classList.remove('fa-solid');
        window.showToast('Removed from favorites!');
    }
};

/* ==========================================================================
   PAGE: SEAT SELECTION
   ========================================================================== */
function initSeatSelection() {
    const container = document.getElementById('seat-map');
    const priceDisplay = document.getElementById('seat-price');
    const selectedList = document.getElementById('selected-seats-list');
    
    if(!container) return;
    
    const rows = 15;
    const cols = ['A', 'B', 'C', 'D', 'E', 'F'];
    let selectedSeats = [];
    const basePrice = 50;
    
    for(let i = 1; i <= rows; i++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'seat-row animate-fade-in';
        rowDiv.style.animationDelay = `${i * 0.05}s`;
        
        cols.forEach((col, index) => {
            if(index === 3) {
                const aisle = document.createElement('div');
                aisle.className = 'aisle';
                aisle.innerText = i;
                rowDiv.appendChild(aisle);
            }
            
            const seat = document.createElement('div');
            seat.className = 'seat';
            
            // Randomly occupy some seats
            if(Math.random() < 0.3) {
                seat.classList.add('occupied');
            }
            
            seat.innerText = `${i}${col}`;
            seat.dataset.seat = `${i}${col}`;
            
            seat.addEventListener('click', () => {
                if(seat.classList.contains('occupied')) return;
                
                if(seat.classList.contains('selected')) {
                    seat.classList.remove('selected');
                    selectedSeats = selectedSeats.filter(s => s !== seat.dataset.seat);
                } else {
                    seat.classList.add('selected');
                    selectedSeats.push(seat.dataset.seat);
                }
                
                updateSeatInfo();
            });
            
            rowDiv.appendChild(seat);
        });
        
        container.appendChild(rowDiv);
    }
    
    function updateSeatInfo() {
        if(selectedList) {
            selectedList.innerHTML = selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None selected';
        }
        if(priceDisplay) {
            priceDisplay.innerText = `₹${selectedSeats.length * basePrice}`;
        }
        localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
    }
    
    const continueBtn = document.getElementById('continue-booking');
    if(continueBtn) {
        continueBtn.addEventListener('click', () => {
            if(selectedSeats.length === 0) {
                window.showToast('Please select at least one seat', 'error');
                return;
            }
            window.location.href = 'booking.html';
        });
    }
}

/* ==========================================================================
   PAGE: BOOKING & PASSENGER DETAILS
   ========================================================================== */
function initBookingPage() {
    const form = document.getElementById('passenger-form');
    const fareSummary = document.getElementById('fare-summary');
    
    // Calculate Fare
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
    const flightId = localStorage.getItem('selectedFlightId');
    const flights = JSON.parse(localStorage.getItem('flights')) || [];
    const flight = flights.find(f => f.id === flightId);
    
    if(flight && fareSummary) {
        const baseFare = flight.price * selectedSeats.length;
        const taxes = Math.floor(baseFare * 0.15); // 15% tax
        const seatCharges = selectedSeats.length * 50;
        const total = baseFare + taxes + seatCharges;
        
        fareSummary.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                <span>Base Fare (${selectedSeats.length} Passenger${selectedSeats.length > 1 ? 's' : ''})</span>
                <span>₹${baseFare}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                <span>Taxes & Fees</span>
                <span>₹${taxes}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                <span>Seat Charges</span>
                <span>₹${seatCharges}</span>
            </div>
            <hr style="border: none; border-top: 1px dashed var(--border-color); margin: 1rem 0;">
            <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.2rem; color: var(--secondary-color)">
                <span>Total Amount</span>
                <span id="final-total">₹${total}</span>
            </div>
        `;
    }
    
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // RegEx Validations
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const passport = document.getElementById('passport').value;
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^\+?[0-9\s\-]{7,15}$/;
            const passportRegex = /^[A-Z0-9]{6,9}$/i;
            
            if(!emailRegex.test(email)) {
                window.showToast('Invalid email format', 'error');
                return;
            }
            if(!phoneRegex.test(phone)) {
                window.showToast('Invalid phone number format', 'error');
                return;
            }
            if(!passportRegex.test(passport)) {
                window.showToast('Invalid passport format (6-9 alphanumeric)', 'error');
                return;
            }
            
            // Generate Booking ID
            const bookingId = 'BKG' + Math.floor(Math.random() * 1000000);
            
            const passengerDetails = {
                name: document.getElementById('fullname').value,
                email: email,
                phone: phone,
                bookingId: bookingId,
                flightId: flightId,
                seats: selectedSeats.join(', '),
                date: new Date().toLocaleDateString(),
                status: 'Confirmed'
            };
            
            // Save to My Bookings
            const history = JSON.parse(localStorage.getItem('bookingHistory')) || [];
            history.push(passengerDetails);
            localStorage.setItem('bookingHistory', JSON.stringify(history));
            
            // Show Interactive Modal instead of immediate redirect
            const modal = document.getElementById('booking-modal');
            if(modal) {
                document.getElementById('modal-booking-id').innerText = bookingId;
                modal.classList.add('active');
            } else {
                // Fallback
                window.showToast('Booking Confirmed successfully!');
                setTimeout(() => window.location.href = 'my-bookings.html', 2000);
            }
        });
    }
}

/* ==========================================================================
   PAGE: MY BOOKINGS
   ========================================================================== */
function initMyBookingsPage() {
    const container = document.getElementById('bookings-container');
    const history = JSON.parse(localStorage.getItem('bookingHistory')) || [];
    
    if(!container) return;
    
    if(history.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 3rem;"><h3>No bookings found.</h3><a href="../index.html" class="btn btn-primary" style="margin-top: 1rem;">Book a flight</a></div>';
        return;
    }
    
    history.forEach((booking, index) => {
        const card = document.createElement('div');
        card.className = 'card animate-fade-in';
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.padding = '1.5rem';
        card.style.marginBottom = '1.5rem';
        card.style.display = 'flex';
        card.style.justifyContent = 'space-between';
        card.style.alignItems = 'center';
        
        card.innerHTML = `
            <div>
                <h4 style="color: var(--secondary-color); margin-bottom: 0.5rem">Booking ID: ${booking.bookingId}</h4>
                <p><strong>Passenger:</strong> ${booking.name}</p>
                <p><strong>Flight:</strong> ${booking.flightId}</p>
                <p><strong>Seats:</strong> ${booking.seats}</p>
                <p><strong>Date:</strong> ${booking.date}</p>
            </div>
            <div style="text-align: right">
                <span style="display: inline-block; padding: 0.3rem 1rem; background: var(--success-color); color: white; border-radius: 20px; font-size: 0.9rem; margin-bottom: 1rem">${booking.status}</span><br>
                <button class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.9rem" onclick="downloadTicket('${booking.bookingId}')"><i class="fa-solid fa-download"></i> Ticket</button>
                <button class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.9rem; color: var(--accent-color); border-color: var(--accent-color)" onclick="cancelBooking('${booking.bookingId}', this)"><i class="fa-solid fa-times"></i> Cancel</button>
            </div>
        `;
        container.appendChild(card);
    });
}

window.downloadTicket = function(id) {
    window.showToast(`Downloading ticket ${id}...`);
};

window.cancelBooking = function(id, btn) {
    if(confirm('Are you sure you want to cancel this booking?')) {
        let history = JSON.parse(localStorage.getItem('bookingHistory')) || [];
        history = history.filter(b => b.bookingId !== id);
        localStorage.setItem('bookingHistory', JSON.stringify(history));
        btn.closest('.card').remove();
        window.showToast('Booking cancelled successfully', 'success');
        
        const container = document.getElementById('bookings-container');
        if(container.children.length === 0) {
            container.innerHTML = '<div style="text-align: center; padding: 3rem;"><h3>No bookings found.</h3></div>';
        }
    }
};

/* ==========================================================================
   PAGE: OFFERS
   ========================================================================== */
function initOffersPage() {
    // Countdown Timer logic
    const countdowns = document.querySelectorAll('.countdown');
    
    countdowns.forEach(timer => {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + Math.floor(Math.random() * 5) + 1); // Random 1-5 days
        
        const updateTimer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            if (distance < 0) {
                clearInterval(updateTimer);
                timer.innerHTML = "EXPIRED";
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            timer.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }, 1000);
    });
}

/* ==========================================================================
   PAGE: FLIGHT DETAILS
   ========================================================================== */
function initFlightDetailsPage() {
    const flightId = localStorage.getItem('selectedFlightId');
    const flights = JSON.parse(localStorage.getItem('flights')) || [];
    const flight = flights.find(f => f.id === flightId);
    
    if(!flight) {
        window.location.href = 'flights.html';
        return;
    }
    
    const header = document.getElementById('detailed-flight-header');
    if(header) {
        header.innerHTML = `
            <div>
                <h2 style="margin-bottom: 0.5rem; color: var(--secondary-color)">${flight.from} to ${flight.to}</h2>
                <p style="color: var(--text-secondary);"><img src="${flight.logo}" style="width: 20px; height: 20px; display: inline-block; vertical-align: middle; border-radius: 50%; background: white; padding: 2px;"> ${flight.airline} | Flight ${flight.id}</p>
            </div>
            <div style="text-align: right">
                <h2 style="color: var(--secondary-color);">₹${flight.price}</h2>
                <p style="color: var(--text-secondary);">${flight.duration} | ${flight.stops === 0 ? 'Non-stop' : flight.stops + ' Stop(s)'}</p>
            </div>
        `;
    }
    
    // Proceed to seat selection
    const btn = document.getElementById('btn-proceed-seat');
    if(btn) {
        btn.addEventListener('click', () => {
            window.location.href = 'seat-selection.html';
        });
    }
}

/* ==========================================================================
   PAGE: FLIGHT SCHEDULE
   ========================================================================== */
function initSchedulePage() {
    const flights = JSON.parse(localStorage.getItem('flights')) || [];
    const tableBody = document.getElementById('schedule-table-body');
    
    // Assign random statuses
    const statuses = [
        { text: 'On Time', class: 'status-ontime' },
        { text: 'Delayed', class: 'status-delayed' },
        { text: 'Boarding', class: 'status-boarding' },
        { text: 'Landed', class: 'status-landed' }
    ];
    
    window.scheduleData = flights.map(f => {
        const randStatus = statuses[Math.floor(Math.random() * statuses.length)];
        return { ...f, status: randStatus };
    });
    
    window.renderSchedule = function(data) {
        if(!tableBody) return;
        tableBody.innerHTML = '';
        data.forEach(flight => {
            const tr = document.createElement('tr');
            tr.style.borderBottom = '1px solid var(--border-color)';
            tr.innerHTML = `
                <td style="padding: 1.2rem 1rem; font-weight: 600;">${flight.id}</td>
                <td style="padding: 1.2rem 1rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <img src="${flight.logo}" style="width: 25px; height: 25px; border-radius: 50%; background: white; padding: 3px;">
                        ${flight.airline}
                    </div>
                </td>
                <td style="padding: 1.2rem 1rem;">${flight.from}</td>
                <td style="padding: 1.2rem 1rem;">${flight.to}</td>
                <td style="padding: 1.2rem 1rem;">${flight.departureTime}</td>
                <td style="padding: 1.2rem 1rem;"><span class="status-badge ${flight.status.class}">${flight.status.text}</span></td>
            `;
            tableBody.appendChild(tr);
        });
    };
    
    window.renderSchedule(window.scheduleData);
}

window.filterSchedule = function() {
    const term = document.getElementById('schedule-search').value.toLowerCase();
    if(!term) {
        window.renderSchedule(window.scheduleData);
        return;
    }
    const filtered = window.scheduleData.filter(f => 
        f.id.toLowerCase().includes(term) || 
        f.from.toLowerCase().includes(term) || 
        f.to.toLowerCase().includes(term) ||
        f.airline.toLowerCase().includes(term)
    );
    window.renderSchedule(filtered);
};

/* ==========================================================================
   BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
    const btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.className = 'btn-primary';
    btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    btn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ==========================================================================
   ADVANCED UI INTERACTIONS (PHASE 4)
   ========================================================================== */
function initAdvancedAnimations() {
    // 1. Splash Screen Logic
    const splash = document.getElementById('splash-screen');
    if (splash) {
        setTimeout(() => {
            splash.style.opacity = '0';
            splash.style.visibility = 'hidden';
            setTimeout(() => splash.remove(), 800);
        }, 1500); // Show for 1.5 seconds
    }

    // 2. Custom Mouse Follower
    const follower = document.querySelector('.mouse-follower');
    if (follower) {
        // High performance mouse move tracking without transform transitions 
        // (transform transition is handled in CSS only for click/hover effects, not movement to avoid lag)
        document.addEventListener('mousemove', (e) => {
            // Use requestAnimationFrame for smooth 60fps tracking
            requestAnimationFrame(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            });
        });

        // Hover effects on interactive elements
        const interactables = document.querySelectorAll('a, button, input, select, .card');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => follower.classList.add('active'));
            el.addEventListener('mouseleave', () => follower.classList.remove('active'));
        });
    }

    // 3. 3D Tilt Effect on Cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            // Only apply on desktop
            if(window.innerWidth < 768) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'transform 0.1s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            if(window.innerWidth < 768) return;
            card.style.transform = '';
            card.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });

    // 5. Ripple Effect on Buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-outline');
    buttons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripples = document.createElement('span');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            ripples.classList.add('ripple');
            
            this.appendChild(ripples);
            
            setTimeout(() => {
                ripples.remove();
            }, 600);
        });
    });

    // 4. Typewriter Effect
    const heroTitle = document.querySelector('.hero h1');
    if(heroTitle) {
        const text = heroTitle.innerText;
        heroTitle.innerHTML = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        // Start typing after splash screen (1.5s)
        setTimeout(typeWriter, 1500); 
    }
}

/* ==========================================================================
   UX ENHANCEMENTS (PHASE 5)
   ========================================================================== */
function initUXComponents() {
    const airports = [
        { code: 'DXB', name: 'Dubai International' },
        { code: 'LHR', name: 'London Heathrow' },
        { code: 'JFK', name: 'New York JFK' },
        { code: 'SIN', name: 'Singapore Changi' },
        { code: 'BOM', name: 'Mumbai Chhatrapati' },
        { code: 'CDG', name: 'Paris Charles de Gaulle' },
        { code: 'SYD', name: 'Sydney Kingsford Smith' },
        { code: 'NRT', name: 'Tokyo Narita' }
    ];

    function setupAutocomplete(inputId, listId) {
        const input = document.getElementById(inputId);
        const list = document.getElementById(listId);
        if(!input || !list) return;

        input.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            list.innerHTML = '';
            if(!val) {
                list.style.display = 'none';
                return;
            }
            const matches = airports.filter(a => a.code.toLowerCase().includes(val) || a.name.toLowerCase().includes(val));
            if(matches.length > 0) {
                list.style.display = 'block';
                matches.forEach(m => {
                    const li = document.createElement('li');
                    li.innerHTML = `<i class="fa-solid fa-location-dot"></i> <div><strong>${m.code}</strong> - ${m.name}</div>`;
                    li.addEventListener('click', () => {
                        input.value = m.code;
                        list.style.display = 'none';
                    });
                    list.appendChild(li);
                });
            } else {
                list.style.display = 'none';
            }
        });

        document.addEventListener('click', (e) => {
            if(e.target !== input && e.target !== list) {
                list.style.display = 'none';
            }
        });
    }

    setupAutocomplete('from', 'from-list');
    setupAutocomplete('to', 'to-list');

    // Passenger Logic
    const paxInput = document.getElementById('passengers-display');
    const paxPopup = document.getElementById('passenger-popup');
    
    if(paxInput && paxPopup) {
        paxInput.addEventListener('click', (e) => {
            e.stopPropagation();
            paxPopup.classList.toggle('active');
        });
        paxPopup.addEventListener('click', (e) => e.stopPropagation());
        document.addEventListener('click', () => {
            paxPopup.classList.remove('active');
        });
    }
}

window.paxCounts = { adults: 1, children: 0 };
window.updatePax = function(type, change) {
    if(type === 'adults') {
        const newVal = window.paxCounts.adults + change;
        if(newVal >= 1 && newVal <= 9) window.paxCounts.adults = newVal;
    } else {
        const newVal = window.paxCounts.children + change;
        if(newVal >= 0 && newVal <= 9) window.paxCounts.children = newVal;
    }
    document.getElementById(`pax-${type}`).innerText = window.paxCounts[type];
    window.updatePaxDisplay();
};

window.updatePaxDisplay = function() {
    const total = window.paxCounts.adults + window.paxCounts.children;
    const cabin = document.getElementById('cabin-class').value;
    const text = `${total} Passenger${total > 1 ? 's' : ''}, ${cabin}`;
    document.getElementById('passengers-display').value = text;
};
