import React from 'react'
import { useReactMediaRecorder } from "react-media-recorder";

function RecordScreen() {
 const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ screen: true });
  return (
    <div>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <video src={mediaBlobUrl} controls autoPlay loop style={{ width: '100%', height: 'auto' }} />
    </div>
  )
}

export default RecordScreen