import React, { useEffect, useState } from 'react';
import { blueprint } from '@ptero/vite';
import { ExclamationTriangleIcon, InformationCircleIcon, ShieldExclamationIcon } from '@heroicons/react/24/solid';
import { Card } from '@/components/elements/card';
import ContentBox from '@/components/elements/ContentBox';
import { format } from 'date-fns';

interface Announcement {
    id: string;
    title: string;
    content: string;
    type: 'info' | 'warning' | 'danger';
    createdAt: string;
}

const typeStyles = {
    info: {
        icon: <InformationCircleIcon className={'h-5 w-5 text-blue-500'} />,
        borderColor: 'border-blue-500',
    },
    warning: {
        icon: <ExclamationTriangleIcon className={'h-5 w-5 text-yellow-500'} />,
        borderColor: 'border-yellow-500',
    },
    danger: {
        icon: <ShieldExclamationIcon className={'h-5 w-5 text-red-500'} />,
        borderColor: 'border-red-500',
    },
};

export default () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Use the blueprint helper to get the correct API URL
        blueprint.get('/api/announcements')
            .then(res => setAnnouncements(res.data))
            .catch(error => console.error('[Announcements] Failed to fetch announcements', error))
            .finally(() => setLoading(false));
    }, []);

    if (loading || announcements.length === 0) {
        return null; // Don't render anything if loading or no announcements
    }

    return (
        <div className={'my-6'}>
            <ContentBox title={'Announcements'}>
                {announcements.map((announcement) => (
                    <Card key={announcement.id} className={`mb-4 border-l-4 ${typeStyles[announcement.type].borderColor}`}>
                        <div className={'flex items-center p-4'}>
                            <div className={'mr-4'}>{typeStyles[announcement.type].icon}</div>
                            <div className={'flex-1'}>
                                <h3 className={'font-semibold'}>{announcement.title}</h3>
                                <p className={'text-sm text-neutral-300 mt-1'}>{announcement.content}</p>
                                <p className={'text-xs text-neutral-400 mt-2'}>
                                    Posted on: {format(new Date(announcement.createdAt), 'MMM d, yyyy @ h:mm a')}
                                </p>
                            </div>
                        </div>
                    </Card>
                ))}
            </ContentBox>
        </div>
    );
};