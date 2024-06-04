import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

@Component({
  selector: 'app-button-wrapper',
  templateUrl: './button-wrapper.component.html',
  styleUrl: './button-wrapper.component.scss'
})
export class ButtonWrapperComponent implements AfterViewInit {
  @ViewChild('buttonContainer', { static: true }) buttonContainer!: ElementRef;

  async ngAfterViewInit() {

    await loadRemoteModule({
      remoteEntry: 'http://localhost:3002/remoteEntry.js',
      remoteName: 'mfeRemote',
      exposedModule: './Hello'
    });

    await loadRemoteModule({
      remoteEntry: 'http://localhost:3002/remoteEntry.js',
      remoteName: 'mfeRemote',
      exposedModule: './App'
    });

    const ButtonModule = await loadRemoteModule({
      remoteEntry: 'http://localhost:3002/remoteEntry.js',
      remoteName: 'mfeRemote',
      exposedModule: './Button'
    });
    const ReactButton = ButtonModule.default; // Assuming default export
    const reactElement = React.createElement(ReactButton, { label: 'Click Me' });

    const container = this.buttonContainer.nativeElement;
    const root = ReactDOM.createRoot(container);
    root.render(reactElement); // Render using 'createRoot'
  }
} 