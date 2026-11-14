// closed-form LV95 (EPSG:2056) -> WGS84 transform, replacing the 139KB
// proj4 dependency (this was its only use). the coefficients are a
// degree-4 polynomial fitted to proj4's exact somerc/Bessel/towgs84
// pipeline over the swiss extent (E 2480000-2840000, N 1070000-1300000):
// max deviation 0.043m - well below the meter precision the
// coordinates fields carry. verified against proj4 in the unit test.
const C_LAT = [
  46.9510827744, 8.99517175797, -0.00708426018935, -0.0368120478158,
  0.000104057776113, 0.000109013649388, 0.0000286024527891, -0.0000177806629935,
  -0.000479293809177, -0.753554817301, -0.125056425441, -0.0207284115235,
  0.0000104267869164, 0.000867668610837, 0.00672042587727,
]
const C_LON = [
  7.43863234662, -0.000158787558069, -0.0000212600077312, 0.0000372378461159,
  0.000784703435218, 13.1361213674, 2.20090797057, 0.368622371396,
  0.0697819151034, 0.0000467561843602, -0.000126903559528, -0.00472870371991,
  -0.123019054621, -0.0698820221156, 0.000789890796368,
]

export const epsg2056to4326 = (x: number | string, y: number | string) => {
  // make sure to pass in numbers, not strings
  const yPrime = (+x - 2600000) / 1e6
  const xPrime = (+y - 1200000) / 1e6
  // the term powers: [y^a * x^b] for a+b <= 4
  const powers = []
  for (let a = 0; a <= 4; a++) {
    for (let b = 0; a + b <= 4; b++) {
      powers.push(yPrime ** a * xPrime ** b)
    }
  }
  let lat = 0
  let lon = 0
  for (let i = 0; i < powers.length; i++) {
    lat += C_LAT[i] * powers[i]
    lon += C_LON[i] * powers[i]
  }
  return [lon, lat]
}
