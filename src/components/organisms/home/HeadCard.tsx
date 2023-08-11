import React, { useEffect, useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { load } from "cheerio";
import { Box, Link, Skeleton, Text, useColorModeValue } from "@chakra-ui/react";
import { AiOutlineCalendar, AiOutlineTag } from "react-icons/ai";
import { formatDate } from "@/lib/formatDate";
import Tags from "@/components/molecules/Tags";
import { FragmentType, useFragment } from "@/gql/generated";
import { PostFragment } from "@/gql/fragments/post";
import { TagFragment } from "@/components/atoms/TagLink";

type Props = {
  post?: FragmentType<typeof PostFragment>;
  loading: boolean;
};

const HeadCard = (props: Props) => {
  const post = useFragment(PostFragment, props.post);
  const loading = props.loading;
  const [excerpt, setExcerpt] = useState("");
  const defaultPostImage = "https://source.unsplash.com/random";

  useEffect(() => {
    const $ = load(post?.excerpt ?? "");
    $("a.more-link").remove();
    setExcerpt($.html());
  }, [post]);

  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      border={useColorModeValue("", "1px")}
      borderColor={useColorModeValue("gray.200", "gray.700")}
      borderRadius={useColorModeValue("", "lg")}
      overflow="hidden"
    >
      <Skeleton isLoaded={!loading} h="100%">
        <Box w="100%" paddingTop="50%" position="relative">
          <Link
            as={NextLink}
            href={`/posts/${post?.databaseId}`}
            position="absolute"
            top="0"
            h="100%"
            w="100%"
            _hover={{ bg: "white" }}
            opacity="0.2"
            zIndex="1"
          ></Link>
          <Image
            src={post?.featuredImage?.node.mediaItemUrl ?? defaultPostImage}
            alt="post"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </Box>
      </Skeleton>
      <Box py="12" px="3">
        <Box>
          <Link as={NextLink} href={`/posts/${post?.databaseId}`}>
            <Text fontSize="3xl" fontWeight="bold" lineHeight="1.8">
              {post?.title}
            </Text>
          </Link>
        </Box>
        <Box mt="2" display="flex" gap="5">
          <Box display="flex" alignItems="center" gap="2">
            <Text color="blue.500" fontSize="2xl">
              <AiOutlineCalendar />
            </Text>
            <Text>{formatDate(post?.date ?? "")}</Text>
          </Box>
          <Box display="flex" alignItems="center" gap="2">
            <Text color="blue.500" fontSize="2xl">
              <AiOutlineTag />
            </Text>
            <Tags tags={post?.tags?.nodes} />
          </Box>
        </Box>
        <Box mt="8" dangerouslySetInnerHTML={{ __html: excerpt }} />
      </Box>
    </Box>
  );
};

export default HeadCard;
