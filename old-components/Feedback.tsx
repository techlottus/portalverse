import { createRef, FC, memo, useEffect, useState } from "react"
import { FeedbackData } from "@/types/Feedback.types"

const Feedback: FC<FeedbackData> = memo(({ data, children, onRight }: FeedbackData) => {
  const feedbackPortalverseRef = createRef();

  const [newContent, setNewContent] = useState(null)

  useEffect(() => {
    (feedbackPortalverseRef.current as any).data = {
      left: data.left || {
        name: '',
        status: '',
      },
      right: data.right || {
        name: '',
      },
      type: data.type || '',
      isTextEvent: data.isTextEvent || false,
      textEvent: data.textEvent || '',
      tagOnRight: data.tagOnRight || '',
      wrapper: true,
    }
  }, [data]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setNewContent(children);
  }, [children]);

  useEffect(() => {
    let observerRef: any = null;
    if (!!feedbackPortalverseRef.current) {
      observerRef = feedbackPortalverseRef.current;
      (feedbackPortalverseRef.current as any).removeEventListener('onRight', onRight, false);
    }
    (feedbackPortalverseRef.current as any).addEventListener('onRight', onRight, false);
    return () => {
      if (!!observerRef) {
        (observerRef as any).removeEventListener('onRight', onRight, false);
      }
    }
  }, [onRight]);// eslint-disable-line react-hooks/exhaustive-deps

  return <lottus-feedback ref={feedbackPortalverseRef}>
    <div slot="areaFeedbackContent">
      { newContent }
    </div>
  </lottus-feedback>  
});

export default Feedback