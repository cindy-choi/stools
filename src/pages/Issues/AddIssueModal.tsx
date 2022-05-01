import React, { useState, useEffect, useRef, } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Storage from '@/storage';
import type Issue from '@/types/Issue';

const AddIssueWrapper = styled.div`
`;
const AddIssueForm = styled(Form)`
  padding: 24px 24px 0 24px;
`;

function AddIssueModal({ open, onClose, onAdded }:{ open: boolean, onClose?: () => void, onAdded?: () => void}) {
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useTranslation();
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      title: { value: string },
      link: { value: string },
    };

    if (!target) return;

    const response = await Storage.addIssue({
      id: uuidv4(),
      title: target?.title?.value,
      link: target?.link?.value,
      status: 'created',
    });

    if (response?.error) {
      console.error(response?.error);
    } else {
      onClose && onClose();
      onAdded && onAdded();
    }
  };

  return (
    <Modal show={open} centered>
      <Modal.Header closeButton>
        { t('add.issue') }
      </Modal.Header>

      <AddIssueForm ref={formRef} onSubmit={handleSubmit}>
        <Form.Group className="form-group">
          <Form.Label>{t('title')}</Form.Label>
          <Form.Control name="title" />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>{t('link')}</Form.Label>
          <Form.Control name="link"/>
        </Form.Group>

        <div className="modal-footer">
          <Button variant="primary" type="submit">{t('add')}</Button>
        </div>
      </AddIssueForm>

    </Modal>
  );
};

export default AddIssueModal;
