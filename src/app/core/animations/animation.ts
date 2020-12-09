import {
    animate, query, sequence, style, transition, trigger
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
    transition('* => *', [
        query(':enter', [style({ opacity: 0 })], { optional: true }),
        query(
            ':leave',
            [style({ opacity: 1 }), animate('0.5s', style({ opacity: 0 }))],
            { optional: true }
        ),
        query(
            ':enter',
            [style({ opacity: 0 }), animate('0.5s', style({ opacity: 1 }))],
            { optional: true }
        )
    ])
]);

export const listAnimation = trigger("anim", [
  transition("void => *", [
    style({ opacity: "0.7", transform: "translateY(-50px)" }),
    sequence([
      animate(
        "1.3s ease",
        style({ opacity: "1", transform: "translateY(0px)" })
      )
    ])
  ])
]);