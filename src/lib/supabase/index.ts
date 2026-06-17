// Export de todos os connectors
export { default as supabase, getCurrentTenantId, isAuthenticated, getCurrentUser, signOut } from './client';
export { default as authConnector } from './auth-connector';
export { default as patientConnector } from './patient-connector';
export { default as protocolConnector } from './protocol-connector';
export { default as treatmentPlanConnector } from './treatment-plan-connector';
