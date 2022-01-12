import React from 'react';

import SettlementsExcel from './documents/ImageSampleSheet';

class App extends React.Component {
  exportPdf = () => {
    console.log('pdf yo');
    const sheet = SettlementsExcel.create({
      fileType: 'xlsx',
    });
    sheet.download();
  }

  render = () => (
    <div className="App">
      <button onClick={this.exportPdf}>
        Download Excel Sheet
      </button>
    </div>
  );
}

export default App;