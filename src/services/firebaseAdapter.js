/**
 * CoServe Firebase / Firestore Service Adapter
 * 
 * Schema Mappings:
 * - users: { id, name, email, phone, role, location, createdAt }
 * - providers: { id, userId, skills[], rating, trustScore, verified, location, availability, pricing, completedJobs, coopFundContribution }
 * - services: { id, category, description, basePrice, subSkills[] }
 * - bookings: { id, customerId, providerId, serviceId, scheduledDate, scheduledSlot, status, pricing, rating, review }
 * - community_fund: { totalPoolBalance, monthlyCollection, disbursedToDate, beneficiaryWorkers, activeGrants[] }
 */

export const firebaseConfigTemplate = {
  apiKey: "AIzaSy_MOCK_FIREBASE_API_KEY",
  authDomain: "coserve-cooperative.firebaseapp.com",
  projectId: "coserve-cooperative",
  storageBucket: "coserve-cooperative.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

export class CoServeFirestoreAdapter {
  constructor(useRealFirebase = false) {
    this.useRealFirebase = useRealFirebase;
  }

  async getProviders(categoryFilter = null) {
    // In prototype / demo mode, returns reactive local collection
    return JSON.parse(localStorage.getItem('coserve_sih_providers_v1') || '[]');
  }

  async createBookingDocument(bookingData) {
    console.log('[Firestore] Written new booking to collection "bookings":', bookingData);
    return { success: true, bookingId: bookingData.id };
  }

  async updateBookingStatus(bookingId, status) {
    console.log(`[Firestore] Updated booking ${bookingId} status to ${status}`);
    return { success: true };
  }

  async recordRatingAndTrust(bookingId, providerId, rating, review) {
    console.log(`[Firestore] Recorded review for provider ${providerId} from booking ${bookingId}`);
    return { success: true };
  }

  async getCommunityFundMetrics() {
    return JSON.parse(localStorage.getItem('coserve_sih_community_fund_v1') || '{}');
  }
}

export const firestoreAdapter = new CoServeFirestoreAdapter(false);
