import {useState, useRef, useCallback, useEffect} from 'react';

const useBottomSheet = onClose => {
  const [isOpen, setIsOpen] = useState(false);
  const timer = useRef();
  const openBottomSheet = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setIsOpen(true);
  };

  const closeBottomSheet = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const metrics = useRef({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    snap: 0,
    isContentAreaTouched: false,
  });

  const sheetRef = useRef(null);
  const contentRef = useRef(null);

  const handleTouchStart = e => {
    const {touchStart} = metrics.current;

    touchStart.sheetY = sheetRef.current.getBoundingClientRect().y;
    touchStart.touchY = e.touches[0].clientY;
    metrics.current.snap = touchStart.sheetY + sheetRef.current.getBoundingClientRect().height / 2;
  };

  const handleTouchMove = e => {
    const {touchStart, isContentAreaTouched} = metrics.current;
    const currentTouch = e.touches[0];

    if (!isContentAreaTouched) {
      e.preventDefault();
      const touchOffset = currentTouch.clientY - touchStart.touchY;
      sheetRef.current.style.setProperty(
        'transform',
        `translateY(${touchOffset > 0 ? touchOffset : 0}px)`,
      );
    }
  };

  const handleTouchEnd = () => {
    const {touchStart, snap} = metrics.current;
    const currentY = sheetRef.current.getBoundingClientRect().y;

    if (currentY > snap) {
      sheetRef.current.style.setProperty(
        'transform',
        `translateY(${window.innerHeight - touchStart.sheetY}px)`,
      );
      timer.current = setTimeout(closeBottomSheet, 100);
    }
    if (currentY < snap) {
      sheetRef.current.style.setProperty('transform', 'translateY(0px)');
    }

    metrics.current.isContentAreaTouched = false;
  };

  const handleContentTouchStart = () => {
    metrics.current.isContentAreaTouched = true;
  };

  const sheet = useCallback(node => {
    if (sheetRef.current) {
      sheetRef.current.removeEventListener('touchstart', handleTouchStart);
      sheetRef.current.removeEventListener('touchmove', handleTouchMove);
      sheetRef.current.removeEventListener('touchend', handleTouchEnd);
    }

    if (node) {
      sheetRef.current = node;
      sheetRef.current.addEventListener('touchstart', handleTouchStart);
      sheetRef.current.addEventListener('touchmove', handleTouchMove);
      sheetRef.current.addEventListener('touchend', handleTouchEnd);
    }
  }, []);

  const content = useCallback(node => {
    if (contentRef.current) {
      contentRef.current.removeEventListener('touchstart', handleContentTouchStart);
    }

    if (node) {
      contentRef.current = node;
      contentRef.current.addEventListener('touchstart', handleContentTouchStart);
    }
  }, []);

  const refs = {sheet, content};

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return {isOpen, openBottomSheet, closeBottomSheet, refs};
};

export default useBottomSheet;
