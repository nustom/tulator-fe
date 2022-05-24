import { Collapse, Spin } from "antd";
import { FC } from "react";
import RepliedComment from "./RepliedComment";
import styles from "./Topic.module.css";
import { useGetTopics } from "./topicAPI";

const Topic: FC<{}> = () => {
  const { data: topics, isLoading } = useGetTopics();

  return (
    <>
      {isLoading ? (
        <Spin size="large" className={styles.loadingSpin} />
      ) : (
        <>
          <Collapse>
            {topics?.length &&
              topics.map((topic, idx) => (
                <Collapse.Panel
                  key={topic.id}
                  header={
                    <div>
                      Topic: <h1> {topic.content}</h1>
                    </div>
                  }
                >
                  <RepliedComment
                    key={topic.id}
                    item={topic}
                    showReply={idx === topics.length - 1}
                    rootTopic={topic}
                    currentIndex={idx}
                  >
                    {topic.topics.length &&
                      topic.topics.map((childTopic, index) => (
                        <RepliedComment
                          key={childTopic.id}
                          item={childTopic}
                          showReply={index === topic.topics.length - 1}
                          rootTopic={topic}
                          currentIndex={index}
                        ></RepliedComment>
                      ))}
                  </RepliedComment>
                </Collapse.Panel>
              ))}
          </Collapse>
        </>
      )}
    </>
  );
};

export default Topic;
