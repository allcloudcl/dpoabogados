import React, { useState, useEffect } from "react";
import Select from "react-select";

import { REGIONES_PROVINCIAS_COMUNAS as CHILE_REGIONS } from "../constants";

function LocationSelect(props) {
  const [region, setRegion] = useState(CHILE_REGIONS[0]);
  const [province, setProvince] = useState(CHILE_REGIONS[0].provincias[0]);
  const [commune, setCommune] = useState(
    CHILE_REGIONS[0].provincias[0].comunas[0]
  );
  const [options, setOptions] = useState({
    provinces: CHILE_REGIONS[0].provincias,
    communes: CHILE_REGIONS[0].provincias[0].comunas,
  });

  // If we receive a commune_code as a prop, we want to set the state to that
  // code's commune, province, and region
  useEffect(() => {
    let opts = { r: {}, p: {}, c: {} };
    // 3. Find the region of that province
    opts.r = CHILE_REGIONS.find(
      (re) =>
        // 2. Find the province of that commune
        (opts.p = re.provincias.find(
          (pr) =>
            // 1. Find the commune whose code equals the prop
            (opts.c = pr.comunas.find((co) => co.code === props.commune_code))
        ))
    );

    // If, for some reason, we don't find those opts. re-set the existing ones.
    setRegion(opts.r || region);
    setProvince(opts.p || province);
    setCommune(opts.c || commune);
  }, [props.commune_code]);

  // Every time we change the selected region, reset the selected province to
  // said region's first province
  useEffect(() => {
    setOptions({ ...options, provinces: region.provincias });
    setProvince(region.provincias[0]);
  }, [region]);

  // Every time we change the selected province, reset the selected commune to
  // said province's first commune
  useEffect(() => {
    setOptions({ ...options, communes: province.comunas });
    setCommune(province.comunas[0]);
  }, [province]);

  // Every time the commune changes, send the new commune to the parent
  // component
  useEffect(() => {
    setCommune(commune);
    props.updateLocation(commune.code);
  }, [commune]);

  return (
    <div className="row">
      <div className="input-group">
        <Select
          className="col px-2"
          placeholder="Región"
          name="region"
          getOptionLabel={(o) => o.region}
          getOptionValue={(o) => o.region_iso_3166_2}
          options={CHILE_REGIONS}
          value={region}
          onChange={setRegion}
        />
        <Select
          className="col px-2"
          placeholder="Provincia"
          name="provincia"
          getOptionLabel={(o) => o.name}
          getOptionValue={(o) => o.name}
          options={options.provinces}
          value={province}
          onChange={setProvince}
        />
        <Select
          className="col px-2"
          placeholder="Comuna"
          name="comuna"
          getOptionLabel={(o) => o.name}
          getOptionValue={(o) => o.code}
          options={options.communes}
          value={commune}
          onChange={setCommune}
        />
      </div>
    </div>
  );
}

export default LocationSelect;
