import React from 'react';

import Window from '@/components/Window';
import BoxButton from '@/components/BoxButton';
import Form from 'react-bootstrap/Form';

function Test() {
  return (
    <div>
      <Window style={{ margin: '4rem', }}>
        <div style={{width: '100px', height: '40px'}}>
          content example
          
        </div>
      </Window>

      <BoxButton style={{ margin: '4rem', }}>
        <span className="material-icons">face</span>
      </BoxButton>

      <div style={{'background': 'black'}}>
        <BoxButton variant="light" boxType="parallelogram" style={{ margin: '4rem', }}>
          <span className="material-icons">face</span>
        </BoxButton>
      </div>

      <BoxButton style={{ margin: '4rem', }}>
        hi
      </BoxButton>

      <BoxButton variant="secondary" boxType="rounded" style={{ margin: '4rem', }}>
        hi
      </BoxButton>

      <Form.Control />
    </div>
  );
};

export default Test;
