import React from 'react';

import { SidebarMenu } from './../../components';

export const SidebarMiddleNav = () => (
    <SidebarMenu>
        <SidebarMenu.Item title="Users List" icon={<i className="fa fa-fw fa-users"></i>} to="/apps/users/list" />
        <SidebarMenu.Item title="S3 List" icon={<i className="fa fa-fw fa-amazon"></i>} to='/apps/sthree/SThreeList' />
        <SidebarMenu.Item title="SCP Group" icon={<i className="fa fa-fw fa-check-square-o"></i>} to='/forms/scpgroup' />
        <SidebarMenu.Item title="Send List" icon={<i className="fa fa-fw fa-send-o"></i>} to='/apps/send/sendlist' />
        <SidebarMenu.Item title="System List" icon={<i className="fa fa-fw fa-envira"></i>} to='/apps/system/systemlist' />
    </SidebarMenu >
);
