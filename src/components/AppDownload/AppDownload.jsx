import React from 'react';
import { assets } from '../../assets/assets';

const AppDownload = () => {
  return (
    <div className="text-center py-5 bg-light" id="app-download">
      <p className="fs-5">
        For Better Experience Download <br /> <strong>ElectroMart</strong>
      </p>

      {/* App Download Platforms */}
      <div className="d-flex justify-content-center gap-3 mt-3">
        <img
          src={assets.play_store}
          alt="Google Play Store"
          className="img-fluid"
          style={{ width: '150px', cursor: 'pointer' }}
        />
        <img
          src={assets.app_store}
          alt="Apple App Store"
          className="img-fluid"
          style={{ width: '150px', cursor: 'pointer' }}
        />
      </div>
    </div>
  );
};

export default AppDownload;
