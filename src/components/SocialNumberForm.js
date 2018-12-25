import React from 'react';

import Label from './Label';
import TextField from './TextField';

function SocialNumberForm() {
  return (
    <div>
      <Label>주민번호 앞 6자리</Label>
      <TextField />
    </div>
  );
}

export default SocialNumberForm;
