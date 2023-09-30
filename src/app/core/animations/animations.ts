import { style, transition, trigger,animate, query, stagger, keyframes } from '@angular/animations';

// ~~~~~~~~~~~~~~ ZOOM ENTER ~~~~~~~~~~~~~ //
export const zoomEnterAnimation = 
    trigger('zoomEnterAnimation', [
        
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
        transition(':leave', [
        style({
            transform: 'scale(1) ',
            opacity: 1,
            // 'background-color': 'rgb(201, 157, 242)',
        }),
        animate('250ms ease-out', style({
            transform: 'scale(0) ',
            opacity: 0,
            // 'background-color': 'aqua',
        }))
    ]),
    ]);

// ~~~~~~~~~~~~~~ LINE TABLE ~~~~~~~~~~~~~ //
export const lineTableAnimation = 
trigger('lineTableAnimation', [
    transition(':leave', [
      style({
          transform: 'translateX(0)',
          opacity: 1,
          // 'background-color': 'rgb(201, 157, 242)',
      }),
      animate('250ms ease-out', style({
          transform: 'translateX(-100px)',
          opacity: 0,
          // 'background-color': 'aqua',
      }))
  ]),
    transition(':enter', [
      style({
        transform: 'translateX(-100px)',
        opacity: 0,
          // 'background-color': 'rgb(201, 157, 242)',
      }),
      animate('250ms ease-out', style({
        transform: 'translateX(0)',
        opacity: 1,
          // 'background-color': 'aqua',
      }))
  ]),
]);

// ~~~~~~ FOR TABLE WITH PAGINATION ~~~~~~ //
export const linePaginateAnimation = 
trigger('linePaginateAnimation', [
    transition(':enter', [
      style({
        transform: 'translateX(-100px)',
        opacity: 0,
          // 'background-color': 'rgb(201, 157, 242)',
      }),
      animate('250ms ease-out', style({
        transform: 'translateX(0)',
        opacity: 1,
          // 'background-color': 'aqua',
      }))
  ]),
]);

// ~~~~~~~~~~~~ TOP TO BOTTOM ~~~~~~~~~~~~ //
export const topToBottomAngelAnimation = 
trigger('boomTrigger', [
    transition('* => *', [
      query(':enter', style({opacity:0}), {optional: true}),
      
      query(':enter', stagger('300ms',[
        animate('1s ease-in', keyframes([
          style({opacity: .3, transform: 'translateY(-75px)', offset: 0}),//depart
          style({opacity: .5, transform: 'translateY(35px)', offset: 0.3}),//ensuite
          style({opacity: 1, transform: 'translateY(0)', offset: 1}),//final (position initial)
        ]))
      ]), {optional: true}),
      query(':leave', stagger('300ms',[
        animate('1s ease-in', keyframes([
          style({opacity: 1, transform: 'translateY(0)', offset: 0}),//final (position initial)
          style({opacity: .5, transform: 'translateY(35px)', offset: 0.3}),//ensuite
          style({opacity: .3, transform: 'translateY(-75px)', offset: 1}),//depart
        ]))
      ]), {optional: true}) ,
    ])
  ]);

  export const topToBottomAnimation = 
trigger('topToBottomAnimation', [
    transition(':leave', [
      style({
          transform: 'translateY(0)',
          opacity: 1,
          // 'background-color': 'rgb(201, 157, 242)',
      }),
      animate('250ms ease-out', style({
          transform: 'translateY(-100px)',
          opacity: 0,
          // 'background-color': 'aqua',
      }))
  ]),
    transition(':enter', [
      style({
        transform: 'translateY(-100px)',
        opacity: 0,
          // 'background-color': 'rgb(201, 157, 242)',
      }),
      animate('250ms ease-out', style({
        transform: 'translateY(0)',
        opacity: 1,
          // 'background-color': 'aqua',
      }))
  ]),
]);
