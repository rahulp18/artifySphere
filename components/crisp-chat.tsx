'use client';
import React, { useEffect } from 'react';
import { Crisp } from 'crisp-sdk-web';
const CrispChat = () => {
  useEffect(() => {
    Crisp.configure('ac2b6960-6108-4e54-a0bf-f1c37992313d');
  });
  return null;
};

export default CrispChat;
