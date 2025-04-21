const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a hospital name'],
    trim: true,
    maxlength: [100, 'Hospital name cannot exceed 100 characters']
  },
  address: {
    street: {
      type: String,
      required: [true, 'Please provide a street address'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'Please provide a city'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'Please provide a state'],
      trim: true
    },
    zipCode: {
      type: String,
      required: [true, 'Please provide a zip code'],
      trim: true
    },
    country: {
      type: String,
      required: true,
      default: 'India',
      trim: true
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  contactInfo: {
    phone: {
      type: String,
      required: [true, 'Please provide a contact number']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email'
      ]
    },
    website: String,
    emergencyContact: String
  },
  facilities: {
    type: [String],
    enum: [
      'emergency',
      'icu',
      'ventilator',
      'mri',
      'ct_scan',
      'x_ray',
      'ultrasound',
      'pathology',
      'cardiology',
      'neurology',
      'orthopedics',
      'pediatrics',
      'gynecology',
      'oncology',
      'psychiatry',
      'dental',
      'ophthalmology',
      'ent',
      'dermatology',
      'urology',
      'dialysis',
      'physiotherapy',
      'ambulance',
      'pharmacy',
      'blood_bank',
      'covid_care'
    ]
  },
  specialties: [String],
  beds: {
    total: {
      type: Number,
      required: [true, 'Please provide total number of beds'],
      default: 0
    },
    available: {
      type: Number,
      default: 0
    },
    icu: {
      total: {
        type: Number,
        default: 0
      },
      available: {
        type: Number,
        default: 0
      }
    },
    ventilators: {
      total: {
        type: Number,
        default: 0
      },
      available: {
        type: Number,
        default: 0
      }
    }
  },
  ratings: {
    average: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
          required: true
        },
        comment: String,
        date: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  operatingHours: {
    emergency: {
      type: String,
      default: '24/7'
    },
    outpatient: {
      type: String,
      default: '9:00 AM - 5:00 PM'
    },
    weekend: String
  },
  insuranceAccepted: [String],
  doctors: [
    {
      name: String,
      specialty: String,
      availability: {
        days: [String],
        hours: String
      }
    }
  ],
  images: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  establishedYear: Number,
  ownership: {
    type: String,
    enum: ['government', 'private', 'trust', 'non-profit']
  },
  accreditation: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create indexes for searching
HospitalSchema.index({ name: 'text', 'address.city': 'text', 'address.state': 'text' });

// Update the updatedAt timestamp before save
HospitalSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual property for calculating average rating based on reviews
HospitalSchema.virtual('averageRating').get(function () {
  if (this.ratings.reviews.length === 0) {
    return 0;
  }

  const sum = this.ratings.reviews.reduce((total, review) => {
    return total + review.rating;
  }, 0);

  return (sum / this.ratings.reviews.length).toFixed(1);
});

// Method to update average rating
HospitalSchema.methods.updateAverageRating = function () {
  const avg = this.averageRating;
  this.ratings.average = avg;
  this.ratings.count = this.ratings.reviews.length;
  return this.save();
};

module.exports = mongoose.model('Hospital', HospitalSchema);