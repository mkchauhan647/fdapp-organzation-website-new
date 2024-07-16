"use client"
import React, { useState } from 'react';
import type { DrawerProps} from 'antd';
import { Button, Drawer, Space } from 'antd';
import Link from 'next/link';

const MobileDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('left');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };



  return (
    <>
      <Space className='block sm:hidden'>
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </Space>
      <Drawer
        placement={placement}
        closable={true}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <ul className="flex items-center gap-10">
          <li>
            <Link href="/"  >Home</Link></li>

          <li>
            <Link href="/">Campaign</Link>
          </li>
          <li>
            <Link href="/">Contestants</Link>
          </li>
          <li>
            <Link href="/">About us</Link>
          </li>
          <li>
              <Link href="/">Contact Us</Link>
          </li>
      </ul>
      </Drawer>
    </>
  );
};

export default MobileDrawer;