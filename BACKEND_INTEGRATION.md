# Backend Integration Guide for MilanoSport Reservation System

## Overview

This guide explains how to connect your React frontend with the Node.js backend booking controller. The integration includes API calls, authentication, and data flow between frontend and backend.

## 1. Backend API Endpoints

Based on your `bookingController.js`, the following endpoints are available:

### Booking Endpoints

- `POST /api/bookings` - Create new booking
- `GET /api/bookings/user` - Get user's bookings
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `GET /api/bookings` - Get all bookings (admin only)
- `PUT /api/bookings/:id/payment-status` - Update payment status (admin only)

### Required Field/Sport Endpoints (You need to create these)

- `GET /api/fields` - Get all fields
- `GET /api/fields/:id` - Get field by ID
- `GET /api/sports` - Get all sports

## 2. Frontend Components Updated

### Step2_ScheduleCheck.tsx

- ✅ Updated to fetch field data from backend
- ✅ Integrated with booking API for availability checking
- ✅ Dynamic time slot generation based on field availability
- ✅ Proper field ID handling for backend integration

### Step3_BookingForm.tsx

- ✅ Updated to submit booking data to backend
- ✅ Integrated with booking API for creating reservations
- ✅ Proper error handling and user feedback
- ✅ File upload support for payment proof

### API Services Created

- ✅ `bookingApi.ts` - Complete booking API integration
- ✅ `AuthContext.tsx` - Authentication context for user management

## 3. Environment Setup

### Backend Configuration

1. Ensure your backend is running on `http://localhost:5000`
2. Update the API_BASE_URL in `src/api/bookingApi.ts` if different
3. Make sure CORS is enabled for your frontend domain

### Frontend Dependencies

- ✅ `axios` - HTTP client for API calls
- ✅ Authentication context for user management

## 4. Data Flow Integration

### Booking Creation Flow:

1. **Step1**: User selects field type
2. **Step2**:
   - Fetch available fields from `/api/fields`
   - Generate time slots based on field availability
   - Check booking conflicts with backend
   - Pass field ID and booking details to Step3
3. **Step3**:
   - Submit booking via `POST /api/bookings`
   - Handle payment proof upload
   - Show confirmation with booking ID

### Required Request Format for Backend:

```typescript
{
  fieldId: string,        // MongoDB ObjectId of the field
  date: string,           // YYYY-MM-DD format
  startTime: string,      // HH:MM format
  endTime: string,        // HH:MM format (calculated from duration)
  paymentMethod: string,  // "cod" for cash, or payment method ID
  notes?: string,         // Optional booking notes
  proofOfPayment?: File   // File upload for payment proof
}
```

## 5. Authentication Integration

### Current Setup:

- Demo authentication system in `AuthContext.tsx`
- Stores JWT token in localStorage
- Adds Authorization header to API requests

### To Use Real Authentication:

1. Update login/logout functions in AuthContext
2. Connect to your actual auth endpoints
3. Update token handling as needed

## 6. Missing Backend Components

You'll need to create these additional controllers:

### Field Controller (`fieldController.js`)

```javascript
export const getAllFields = async (req, res) => {
  try {
    const fields = await Field.find({ isActive: true }).populate("sport", "sportName").sort({ name: 1 });

    return res.status(200).json({
      status: 200,
      data: fields,
      message: "Fields retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};
```

### Check Availability Endpoint

Add this to your `bookingController.js`:

```javascript
export const checkAvailability = async (req, res) => {
  try {
    const { fieldId, date, startTime, endTime } = req.body;

    const conflict = await checkBookingConflict(fieldId, date, startTime, endTime);

    if (conflict) {
      return res.status(400).json({
        status: 400,
        message: "Time slot is not available",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Time slot is available",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};
```

## 7. Frontend Usage Examples

### Creating a Booking:

```typescript
import { bookingApi } from "../api/bookingApi";

const handleBooking = async () => {
  try {
    const bookingData = {
      fieldId: "field_object_id",
      date: "2025-10-15",
      startTime: "09:00",
      endTime: "11:00",
      paymentMethod: "cod",
      notes: "Birthday party booking",
    };

    const response = await bookingApi.createBooking(bookingData);
    console.log("Booking created:", response.data);
  } catch (error) {
    console.error("Booking failed:", error.message);
  }
};
```

### Checking Availability:

```typescript
const checkSlotAvailability = async () => {
  try {
    const result = await bookingApi.checkAvailability({
      fieldId: "field_id",
      date: "2025-10-15",
      startTime: "09:00",
      endTime: "11:00",
    });

    if (result.available) {
      console.log("Slot is available");
    }
  } catch (error) {
    console.log("Slot not available:", error.message);
  }
};
```

## 8. Testing the Integration

### Step-by-Step Testing:

1. **Start Backend**: Ensure your Node.js server is running
2. **Start Frontend**: Run `npm run dev`
3. **Test Authentication**: Use demo login for testing
4. **Test Field Selection**: Navigate to reservation page
5. **Test Booking Creation**: Complete the 3-step booking flow
6. **Verify Database**: Check that bookings are created in MongoDB

### Demo Authentication:

```typescript
// For testing purposes, you can use:
import { demoLogin } from "../context/AuthContext";

// Login as regular user
const { token, user } = demoLogin(false);

// Login as admin
const { token, user } = demoLogin(true);
```

## 9. Error Handling

### Common Scenarios:

- Network errors (backend offline)
- Validation errors (invalid data)
- Authentication errors (expired token)
- Business logic errors (booking conflicts)

### Frontend Error Display:

- User-friendly error messages
- Loading states during API calls
- Proper form validation before submission

## 10. Next Steps

1. **Create Field API**: Implement field controller and endpoints
2. **Test Integration**: Verify all booking flows work
3. **Add Real Auth**: Replace demo auth with actual login system
4. **Optimize Performance**: Add caching for field data
5. **Add Real-time Updates**: Consider WebSocket for live availability

## 11. Production Deployment

### Environment Variables:

- Update API_BASE_URL for production
- Configure proper CORS settings
- Set up proper authentication
- Add error logging and monitoring

This integration provides a solid foundation for connecting your React frontend with the Node.js backend booking system.
