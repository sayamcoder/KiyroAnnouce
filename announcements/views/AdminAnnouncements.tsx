import React, a { useState, useEffect } from 'react';
import { blueprint, useBlueprint } from '@ptero/vite';
import AdminContentBlock from '@/components/admin/AdminContentBlock';
import { Button } from '@/components/elements/button';
import { Field, Form, Formik } from 'formik';
import { format } from 'date-fns';
import { TrashIcon } from '@heroicons/react/24/outline';

interface Announcement {
    id: string;
    title: string;
    content: string;
    type: 'info' | 'warning' | 'danger';
    createdAt: string;
}

export default () => {
    const { Larakits } = useBlueprint();
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);

    const fetchAnnouncements = () => {
        blueprint.get('/api/announcements')
            .then(res => setAnnouncements(res.data))
            .catch(error => Larakits.error('Failed to fetch announcements.'));
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const handleDelete = (id: string) => {
        blueprint.delete(`/api/announcements/${id}`)
            .then(() => {
                Larakits.success('Announcement deleted successfully.');
                fetchAnnouncements(); // Refresh the list
            })
            .catch(error => Larakits.error('Failed to delete announcement.'));
    };

    const handleCreate = (values: { title: string, content: string, type: string }, { resetForm }: any) => {
        blueprint.post('/api/announcements', values)
            .then(() => {
                Larakits.success('Announcement created successfully.');
                fetchAnnouncements(); // Refresh the list
                resetForm();
            })
            .catch(error => Larakits.error(error.message || 'Failed to create announcement.'));
    };

    return (
        <AdminContentBlock title={'Announcement Management'}>
            <div className={'grid grid-cols-1 md:grid-cols-2 gap-8'}>
                <div>
                    <h3 className={'mb-4 text-2xl'}>Create New Announcement</h3>
                    <Formik
                        onSubmit={handleCreate}
                        initialValues={{ title: '', content: '', type: 'info' }}
                    >
                        <Form>
                            <label htmlFor={'title'}>Title</label>
                            <Field id={'title'} name={'title'} className={'input'} />

                            <label htmlFor={'content'} className={'mt-4'}>Content</label>
                            <Field as={'textarea'} id={'content'} name={'content'} className={'input'} rows={4} />

                            <label htmlFor={'type'} className={'mt-4'}>Type</label>
                            <Field as={'select'} id={'type'} name={'type'} className={'input'}>
                                <option value="info">Info (Blue)</option>
                                <option value="warning">Warning (Yellow)</option>
                                <option value="danger">Danger (Red)</option>
                            </Field>

                            <Button type={'submit'} className={'mt-6'}>
                                Create Announcement
                            </Button>
                        </Form>
                    </Formik>
                </div>
                <div>
                    <h3 className={'mb-4 text-2xl'}>Existing Announcements</h3>
                    <div className={'space-y-4'}>
                        {announcements.length > 0 ? announcements.map(ann => (
                            <div key={ann.id} className={'bg-neutral-700 p-4 rounded flex justify-between items-center'}>
                                <div>
                                    <p className={'font-bold'}>{ann.title}</p>
                                    <p className={'text-sm text-neutral-300'}>{ann.content}</p>
                                    <p className={'text-xs text-neutral-400 mt-1'}>
                                        {format(new Date(ann.createdAt), 'MMM d, yyyy')} - Type: {ann.type}
                                    </p>
                                </div>
                                <Button.Danger onClick={() => handleDelete(ann.id)} size={'x-small'} isSecondary>
                                    <TrashIcon className={'h-4 w-4'} />
                                </Button.Danger>
                            </div>
                        )) : (
                            <p>No announcements have been created yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </AdminContentBlock>
    );
};