'use client';
import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
const testimonials = [
  {
    name: 'Dimple',
    avatar: 'D',
    title: 'Student',
    description: "This is the best application I've ever used!",
  },
  {
    name: 'Ms Dhoni',
    avatar: 'M',
    title: 'Cricketer',
    description: 'I use this daily for generating new photos!',
  },
  {
    name: 'Rahul Pradhan',
    avatar: 'R',
    title: 'CEO',
    description:
      'This app has changed my life, cannot imagine working without it!',
  },
  {
    name: 'Virat Kohli',
    avatar: 'V',
    title: 'legend',
    description:
      'The best in class, definitely worth the premium subscription!',
  },
];
const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {testimonials.map(item => (
          <Card key={item.name} className="bg-white/10 border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingContent;
