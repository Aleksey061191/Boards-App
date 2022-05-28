import React from 'react';
import cl from './FileUpload.module.scss';

function FileUpload(): JSX.Element {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    console.log(files);
    // const fr = new FileReader();
    // fr.onload = (event) => {
    //   const file = event.target!.result;
    //   console.log(file);
    // }
    // const filesArr = files.;
    // console.log(filesArr);
    // this.setState({ files: [...this.state.files, ...filesArr] });
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
