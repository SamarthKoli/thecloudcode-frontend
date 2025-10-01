import React, { useRef, useEffect, useState } from 'react';

const ScrollVelocity = ({ texts, velocity = 100, className }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);
  const scrollPos = useRef(0);
  const animFrameId = useRef(null);
  const lastTimestamp = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.offsetWidth);
    }
  }, [texts]);

  useEffect(() => {
    if (!contentWidth) return;

    const container = containerRef.current;

    const animate = (timestamp) => {
      if (!lastTimestamp.current) lastTimestamp.current = timestamp;
      const elapsed = timestamp - lastTimestamp.current;

      scrollPos.current += (velocity * elapsed) / 1000;
      if (scrollPos.current >= contentWidth) {
        scrollPos.current -= contentWidth;
      }
      container.style.transform = `translateX(-${scrollPos.current}px)`;

      lastTimestamp.current = timestamp;
      animFrameId.current = requestAnimationFrame(animate);
    };

    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [velocity, contentWidth]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        cursor: 'grab',
        display: 'flex',
        willChange: 'transform',
      }}
    >
      <div ref={contentRef} style={{ display: 'inline-flex', flexShrink: 0 }}>
        {texts.map((text, i) => (
          <span key={i} style={{ paddingRight: '4rem', flexShrink: 0 }}>
            {text}
          </span>
        ))}
      </div>
      <div style={{ display: 'inline-flex', flexShrink: 0 }}>
        {texts.map((text, i) => (
          <span key={'clone-' + i} style={{ paddingRight: '4rem', flexShrink: 0 }}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ScrollVelocity;
