import React, { useState, useEffect } from "react";
import Select from "react-select";

import { REGIONES_PROVINCIAS_COMUNAS as CHILE_REGIONS } from "../constants";

function LocationSelect(props) {
  const [region, setRegion] = useState(CHILE_REGIONS[0]);
  const [province, setProvince] = useState(CHILE_REGIONS[0].provincias[0]);
  const [commune, setCommune] = useState(CHILE_REGIONS[0].provincias[0].comunas[0]);
  const [options, setOptions] = useState({
    provinces: CHILE_REGIONS[0].provincias,
    communes: CHILE_REGIONS[0].provincias[0].comunas,
  });

  useEffect(() => {
    setOptions({...options, provinces: region.provincias});
    setProvince(region.provincias[0]);
  }, [region]);

  useEffect(() => {
    setOptions({...options, communes: province.comunas});
    setCommune(province.comunas[0]);
  }, [province]);

  useEffect(() => {
    let location = {
      region: region.region_iso_3166_2,
      province: province.name,
      commune_code: commune.code
    };
    props.updateLocation(location);
  }, [commune])

  return (
    <div className="row">
      <div className="input-group">
        <Select className="col px-2"
          placeholder="Región"
          name="region"
          getOptionLabel={(o) => o.region}
          getOptionValue={(o) => o.region_iso_3166_2}
          options={CHILE_REGIONS}
          value={region}
          onChange={setRegion}
        />
        <Select className="col px-2"
          placeholder="Provincia"
          name="provincia"
          getOptionLabel={(o) => o.name}
          getOptionValue={(o) => o.name}
          options={options.provinces}
          value={province}
          onChange={setProvince}
        />
        <Select className="col px-2"
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
