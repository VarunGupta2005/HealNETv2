// Get URL parameters
function getUrlParameters() {
  const params = {};
  const queryString = window.location.search.substring(1);
  const pairs = queryString.split('&');

  for (const pair of pairs) {
    if (pair === '') continue;
    const parts = pair.split('=');
    params[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1] || '');
  }

  return params;
}

// Initialize the search results page
function initSearchPage() {
  // Set up navbar toggle for mobile
  $('.fa-bars').click(function () {
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle');
  });

  $(window).on('scroll load', function () {
    $('.fa-bars').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');

    if ($(window).scrollTop() > 30) {
      $('header').addClass('header-active');
    } else {
      $('header').removeClass('header-active');
    }
  });

  // Hospital search functionality in the header
  $('.search-button').click(function () {
    performHospitalSearch();
  });

  // Allow search on Enter key press
  $('#hospitalSearch').keypress(function (e) {
    if (e.which == 13) { // Enter key
      performHospitalSearch();
    }
  });

  // Get search parameters from URL
  const params = getUrlParameters();
  const searchQuery = params.search || '';
  const facilityFilter = params.facility || '';

  // Display search query in the UI
  $('#searchTerm').text(searchQuery);

  // Set initial filter values based on URL parameters
  if (facilityFilter) {
    $('#facilityFilter').val(facilityFilter);
  }

  // Load search results
  loadHospitals(searchQuery, facilityFilter);

  // Set up filter buttons
  $('#applyFilters').click(function () {
    applyFilters();
  });

  $('#resetFilters').click(function () {
    resetFilters();
  });
}

// Perform a new search from the search bar
function performHospitalSearch() {
  const searchQuery = $('#hospitalSearch').val().trim();

  if (searchQuery.length > 0) {
    // Check if the search query matches any specific facility
    const knownFacilities = [
      'emergency', 'icu', 'ventilator', 'mri', 'ct_scan', 'x_ray', 'ultrasound',
      'pathology', 'cardiology', 'neurology', 'orthopedics', 'pediatrics',
      'gynecology', 'oncology', 'psychiatry', 'dental', 'ophthalmology',
      'ent', 'dermatology', 'urology', 'dialysis', 'physiotherapy',
      'ambulance', 'pharmacy', 'blood_bank', 'covid_care'
    ];

    const searchTerm = searchQuery.toLowerCase();
    let facilityParam = '';

    // Check if search term matches a known facility
    for (const facility of knownFacilities) {
      if (searchTerm.includes(facility) ||
        facility.includes(searchTerm) ||
        searchTerm.replace(/\s+/g, '_') === facility ||
        searchTerm === facility.replace(/_/g, ' ')) {
        facilityParam = `&facility=${facility}`;
        break;
      }
    }

    // Redirect with search parameters - Fix the URL to use /search consistently
    window.location.href = `/search?search=${encodeURIComponent(searchQuery)}${facilityParam}`;
  }
}

// Apply filters from the filter form
function applyFilters() {
  const searchQuery = $('#searchTerm').text();
  const facility = $('#facilityFilter').val();
  const rating = $('#ratingFilter').val();
  const city = $('#cityFilter').val().trim();

  let queryString = `?search=${encodeURIComponent(searchQuery)}`;

  if (facility) {
    queryString += `&facility=${encodeURIComponent(facility)}`;
  }

  if (rating) {
    queryString += `&rating=${encodeURIComponent(rating)}`;
  }

  if (city) {
    queryString += `&city=${encodeURIComponent(city)}`;
  }

  // Reload the page with new filters
  window.location.href = `/search${queryString}`;
}

// Reset all filters
function resetFilters() {
  const searchQuery = $('#searchTerm').text();
  window.location.href = `/search?search=${encodeURIComponent(searchQuery)}`;
}

// Load hospitals from API based on search criteria
function loadHospitals(searchQuery, facilityFilter, ratingFilter, cityFilter) {
  // Show loading state
  $('#hospitalResults .loading').show();
  $('#hospitalResults .no-results').hide();

  // In a real application, this would be an API call
  // For this prototype, we'll simulate an API response with mock data
  setTimeout(() => {
    const hospitals = getMockHospitals();

    // Filter hospitals based on search criteria
    let filteredHospitals = hospitals;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredHospitals = filteredHospitals.filter(hospital =>
        hospital.name.toLowerCase().includes(query) ||
        hospital.address.city.toLowerCase().includes(query) ||
        hospital.address.state.toLowerCase().includes(query)
      );
    }

    if (facilityFilter) {
      filteredHospitals = filteredHospitals.filter(hospital =>
        hospital.facilities.includes(facilityFilter)
      );
    }

    if (ratingFilter) {
      const minRating = parseFloat(ratingFilter);
      filteredHospitals = filteredHospitals.filter(hospital =>
        hospital.ratings.average >= minRating
      );
    }

    if (cityFilter) {
      const city = cityFilter.toLowerCase();
      filteredHospitals = filteredHospitals.filter(hospital =>
        hospital.address.city.toLowerCase().includes(city)
      );
    }

    // Update the results count
    $('#resultNumber').text(filteredHospitals.length);

    // Clear loading state
    $('#hospitalResults .loading').hide();

    // Display results or show "no results" message
    if (filteredHospitals.length > 0) {
      displayHospitals(filteredHospitals);
    } else {
      $('#hospitalResults .no-results').show();
    }
  }, 1000); // Simulate API delay
}

// Display hospitals in the results container
function displayHospitals(hospitals) {
  const resultsContainer = $('#hospitalResults');

  // Clear previous results (except the loading and no-results elements)
  resultsContainer.find('.hospital-card').remove();

  // Add each hospital to the results
  hospitals.forEach(hospital => {
    const card = createHospitalCard(hospital);
    resultsContainer.append(card);
  });
}

// Create HTML for a hospital card
function createHospitalCard(hospital) {
  // Generate star rating HTML
  const stars = generateStarRating(hospital.ratings.average);

  // Generate facility badges (limited to 3 for display)
  const facilityBadges = hospital.facilities.slice(0, 3).map(facility =>
    `<span class="facility-badge">${facility.replace(/_/g, ' ')}</span>`
  ).join('');

  // Generate availability class and icon based on available beds
  let availabilityClass, availabilityIcon, availabilityText;
  const availabilityPercentage = (hospital.beds.available / hospital.beds.total) * 100;

  if (availabilityPercentage > 30) {
    availabilityClass = 'available';
    availabilityIcon = 'fa-check-circle';
    availabilityText = 'Beds Available';
  } else if (availabilityPercentage > 0) {
    availabilityClass = 'limited';
    availabilityIcon = 'fa-exclamation-circle';
    availabilityText = 'Limited Availability';
  } else {
    availabilityClass = 'full';
    availabilityIcon = 'fa-times-circle';
    availabilityText = 'Currently Full';
  }

  // Create the hospital card HTML
  return `
        <div class="hospital-card">
            <div class="image-container">
                <img src="${hospital.images[0] || 'images/about-1.jpg'}" alt="${hospital.name}">
            </div>
            <div class="content">
                <h3>${hospital.name}</h3>
                <div class="address">
                    <i class="fas fa-map-marker-alt"></i> 
                    ${hospital.address.street}, ${hospital.address.city}, ${hospital.address.state} ${hospital.address.zipCode}
                </div>
                <div class="rating">
                    <div class="stars">${stars}</div>
                    <div class="count">(${hospital.ratings.count} reviews)</div>
                </div>
                <div class="availability ${availabilityClass}">
                    <i class="fas ${availabilityIcon}"></i> 
                    ${availabilityText} (${hospital.beds.available}/${hospital.beds.total})
                </div>
                <div class="facilities">
                    ${facilityBadges}
                    ${hospital.facilities.length > 3 ? `<span class="facility-badge">+${hospital.facilities.length - 3} more</span>` : ''}
                </div>
                <div class="buttons">
                    <button class="view-details" data-id="${hospital.id}">View Details</button>
                    <button class="book-appointment" data-id="${hospital.id}">Book Appointment</button>
                </div>
            </div>
        </div>
    `;
}

// Generate star rating HTML
function generateStarRating(rating) {
  let stars = '';
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }

  // Add half star if needed
  if (halfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }

  // Add empty stars
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star"></i>';
  }

  return stars;
}

// Mock data for hospitals (in a real app, this would come from an API)
function getMockHospitals() {
  return [
    {
      id: 1,
      name: "City General Hospital",
      address: {
        street: "123 Health Avenue",
        city: "Mumbai",
        state: "Maharashtra",
        zipCode: "400001",
        country: "India"
      },
      contactInfo: {
        phone: "+91-22-12345678",
        email: "info@citygeneral.com",
        website: "www.citygeneral.com",
        emergencyContact: "+91-22-87654321"
      },
      facilities: ["emergency", "icu", "mri", "cardiology", "neurology", "orthopedics"],
      specialties: ["Cardiology", "Neurology", "General Surgery"],
      beds: {
        total: 500,
        available: 120,
        icu: {
          total: 50,
          available: 10
        },
        ventilators: {
          total: 30,
          available: 5
        }
      },
      ratings: {
        average: 4.5,
        count: 328,
        reviews: []
      },
      images: ["images/about-1.jpg"]
    },
    {
      id: 2,
      name: "National Medical Center",
      address: {
        street: "456 Care Street",
        city: "Delhi",
        state: "Delhi",
        zipCode: "110001",
        country: "India"
      },
      contactInfo: {
        phone: "+91-11-23456789",
        email: "contact@nationalmedical.com",
        website: "www.nationalmedical.com",
        emergencyContact: "+91-11-98765432"
      },
      facilities: ["emergency", "icu", "ventilator", "pathology", "oncology", "dialysis"],
      specialties: ["Oncology", "Nephrology", "Internal Medicine"],
      beds: {
        total: 350,
        available: 50,
        icu: {
          total: 40,
          available: 5
        },
        ventilators: {
          total: 25,
          available: 3
        }
      },
      ratings: {
        average: 4.2,
        count: 215,
        reviews: []
      },
      images: ["images/about-2.jpg"]
    },
    {
      id: 3,
      name: "Apollo Hospitals",
      address: {
        street: "789 Wellness Road",
        city: "Bangalore",
        state: "Karnataka",
        zipCode: "560001",
        country: "India"
      },
      contactInfo: {
        phone: "+91-80-34567890",
        email: "info@apollohospitals.com",
        website: "www.apollohospitals.com",
        emergencyContact: "+91-80-09876543"
      },
      facilities: ["emergency", "icu", "mri", "ct_scan", "cardiology", "neurology", "orthopedics", "oncology"],
      specialties: ["Multi-Specialty"],
      beds: {
        total: 600,
        available: 150,
        icu: {
          total: 60,
          available: 15
        },
        ventilators: {
          total: 40,
          available: 8
        }
      },
      ratings: {
        average: 4.7,
        count: 512,
        reviews: []
      },
      images: ["images/about-3.jpg"]
    },
    {
      id: 4,
      name: "AIIMS",
      address: {
        street: "101 Medical Campus",
        city: "Delhi",
        state: "Delhi",
        zipCode: "110029",
        country: "India"
      },
      contactInfo: {
        phone: "+91-11-45678901",
        email: "contact@aiims.edu",
        website: "www.aiims.edu",
        emergencyContact: "+91-11-10987654"
      },
      facilities: ["emergency", "icu", "ventilator", "mri", "ct_scan", "x_ray", "ultrasound", "pathology", "cardiology", "neurology"],
      specialties: ["Research", "Academic Medicine", "Tertiary Care"],
      beds: {
        total: 800,
        available: 0,
        icu: {
          total: 80,
          available: 0
        },
        ventilators: {
          total: 50,
          available: 0
        }
      },
      ratings: {
        average: 4.9,
        count: 724,
        reviews: []
      },
      images: ["images/doctor-1.jpg"]
    },
    {
      id: 5,
      name: "Fortis Healthcare",
      address: {
        street: "202 Health Park",
        city: "Mumbai",
        state: "Maharashtra",
        zipCode: "400016",
        country: "India"
      },
      contactInfo: {
        phone: "+91-22-56789012",
        email: "info@fortishealthcare.com",
        website: "www.fortishealthcare.com",
        emergencyContact: "+91-22-21098765"
      },
      facilities: ["emergency", "icu", "cardiology", "orthopedics", "gynecology", "pediatrics"],
      specialties: ["Cardiology", "Orthopedics", "Women's Health"],
      beds: {
        total: 300,
        available: 85,
        icu: {
          total: 30,
          available: 7
        },
        ventilators: {
          total: 20,
          available: 4
        }
      },
      ratings: {
        average: 4.4,
        count: 289,
        reviews: []
      },
      images: ["images/doctor-2.jpg"]
    },
    {
      id: 6,
      name: "Max Super Specialty Hospital",
      address: {
        street: "303 Care Boulevard",
        city: "Chennai",
        state: "Tamil Nadu",
        zipCode: "600001",
        country: "India"
      },
      contactInfo: {
        phone: "+91-44-67890123",
        email: "contact@maxhospital.com",
        website: "www.maxhospital.com",
        emergencyContact: "+91-44-32109876"
      },
      facilities: ["emergency", "icu", "mri", "ct_scan", "oncology", "cardiology", "neurology", "dental"],
      specialties: ["Cancer Care", "Cardiac Sciences", "Neurosciences"],
      beds: {
        total: 400,
        available: 95,
        icu: {
          total: 40,
          available: 12
        },
        ventilators: {
          total: 30,
          available: 6
        }
      },
      ratings: {
        average: 4.6,
        count: 356,
        reviews: []
      },
      images: ["images/doctor-3.jpg"]
    }
  ];
}

// Initialize the page when the DOM is fully loaded
$(document).ready(function () {
  initSearchPage();

  // Handle hospital card button clicks
  $(document).on('click', '.view-details', function () {
    const hospitalId = $(this).data('id');
    // In a real app, redirect to a detailed view
    alert(`View details for hospital ID: ${hospitalId}`);
  });

  $(document).on('click', '.book-appointment', function () {
    const hospitalId = $(this).data('id');
    // In a real app, redirect to appointment booking page
    window.location.href = `/Appointment/index.html?hospitalId=${hospitalId}`;
  });
});