import React from 'react';
import cl from './FileUpload.module.scss';

function FileUpload(): JSX.Element {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
  };
  return (
    <div className={cl.wrapper}>
      <label className={cl.fileUpload}>
        <input type="file" multiple onChange={onChange} />+ Add files
      </label>
      {/* {state.files.map(x => 
      <div className="file-preview" onClick={removeFile.bind(this, x)}>{x.name}</div>
    )} */}
    </div>
  );
}

export default FileUpload;
