import Container from "@/layouts/Container.layout";
import NumbersPortalverseWrapper from "@/components/NumbersPortalverseWrapper";
import type { StatisticsCardListSection } from "@/utils/strapi/sections/StatisticsCardList";

const StatisticsCardList = (props: StatisticsCardListSection) => {
  const { statisticsCards: cards } = props;

  return (
    <section>
      <Container>
        {
          cards?.length > 0
            ? <div
                className="grid w-p:!grid-cols-1 w-t:!grid-cols-2 gap-6"
                style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}
              >
                {
                  cards?.map((card, i) => {
                    return (
                      <div key={i}>
                        <NumbersPortalverseWrapper
                          data={card}
                          classNames="p-2 justify-center"
                        />
                      </div>
                    );
                  })
                }
              </div>
            : null
        }
      </Container>
    </section>
  );
};

export default StatisticsCardList;