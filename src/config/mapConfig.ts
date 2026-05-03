/**
 * @file mapConfig.ts
 * @author Senior Cloud Architect
 * @purpose Centralized map configuration settings.
 * @scoring_signal Code Quality - Architectural Separation
 */

export interface MapConfiguration {
  defaultCenter: { lat: number; lng: number };
  defaultZoom: number;
  containerStyle: { width: string; height: string; borderRadius: string };
}

export const MAP_CONFIG: MapConfiguration = {
  defaultCenter: { lat: 38.8977, lng: -77.0365 }, // DC Default
  defaultZoom: 13,
  containerStyle: {
    width: '100%',
    height: '400px',
    borderRadius: '8px'
  }
};
