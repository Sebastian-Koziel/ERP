import React, { useState, useRef, useCallback, ReactNode } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

// Types for the confirmation dialog props
interface ConfirmationDialogProps {
  title: string;
  message: string;
}

// Hook
function useConfirmationDialog() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});

  const getConfirmation = useCallback(
    (confirmAction: () => void) => {
      setOnConfirm(() => confirmAction);
      onOpen();
    },
    [onOpen]
  );

  // Confirmation dialog component
const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ title, message }) => (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{message}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={() => {
              onConfirm();
              onClose();
            }} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  return { getConfirmation, ConfirmationDialog };
}

export default useConfirmationDialog;
