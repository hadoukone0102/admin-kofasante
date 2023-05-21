import { style, transition, trigger,animate } from '@angular/animations';


export const lineAnime = 
    trigger('lineAnime', [
        
        transition(':enter', [
        style({
            transform: 'scale(0) ',
            opacity: 0,
            // 'background-color': 'rgb(201, 157, 242)',
        }),
        animate('250ms ease-out', style({
            transform: 'scale(1) ',
            opacity: 1,
            // 'background-color': 'aqua',
        }))
    ]),
    ])