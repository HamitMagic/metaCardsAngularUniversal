import { Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { VideoComponent } from './layout/video/video.component';

export const routes: Routes = [
	{
		path: ':id',
		component: VideoComponent
	},
	{
		path: '**',
		component: MainComponent,
	}
];
