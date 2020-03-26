import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('myvideo', {static: true}) myVideo: any;
  @ViewChild('textAreaConexao', {static: true}) textAreaConexao: any;

  title = 'app works!';

  targetpeer: any;
  peer: any;
  n = <any>navigator;
  tokenConexao: string;

  ngOnInit() {
    let video = this.myVideo.nativeElement;
    let peerx: any;
    this.n.getUserMedia = (this.n.getUserMedia || this.n.webkitGetUserMedia || this.n.mozGetUserMedia || this.n.msGetUserMedia);
    this.n.getUserMedia({video: true, audio: true}, function(stream) {

    peerx = new SimplePeer ({
      initiator: location.hash === '#init',
      trickle: false,
      stream:stream
    });

    peerx.on('signal', function(data) {
      document.querySelector('#signal').textContent = JSON.stringify(data);
      this.targetpeer = data;
    });

    peerx.on('data', function(data) {
      console.log('Recieved message:' + data);
    });

    peerx.on('stream', function(stream) {
      video.srcObject = stream;
      video.play();
    });

    }, function(err){
    console.log('Failed to get stream', err);
    });

    setTimeout(() => {
      this.peer = peerx;
    }, 5000);
  }

  connect() {
    this.peer.signal(JSON.parse(this.targetpeer));
  }

  message() {
    this.peer.send('Hello world');
  }
}
