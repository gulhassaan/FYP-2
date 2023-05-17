import React,{useState,useContext} from "react";
import API from "../ImgServices";
import {ImagesContext} from "../App"
import _ from "lodash"
import { red } from "@mui/material/colors";





export const MultiUploader = (props) => {
    const  {Images,setImages}  = useContext(ImagesContext);  

   console.log("THIS IS CON : ",Images)

    const handleChange = async e => {
        let { files } = e.target;

        let formData = new FormData();
        _.forEach(files, file => {
            formData.append('files', file);
        });

    
        let { data } = await API.post('/images/multi-upload', formData);
        setImages(data);
     
    }

    return (
        <div className="form-group">
              <div className="d-flex">
                <div className="d-flex">
                     
                    <input multiple className="file-input" accept="image/*" type="file"  onChange={handleChange} />
                </div>
              
            </div>
            <div className="d-flex flex-wrap mt-4">
                {
                          Images.map(uploadedImg => (
                            <img style={{ width: 100, height: 100 }} src={uploadedImg} key={uploadedImg} alt="UploadedImage"/>
                        ))
               
                }
            </div>
        </div>
    )
}


//<img style={{ width: 100, height: 100 }} src={Images} alt="Upload again" className="ml-3 img-fluid img-thumbnail" ></img>