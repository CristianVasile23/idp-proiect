\c db;

CREATE OR REPLACE PROCEDURE add_news(input_markdown TEXT)
LANGUAGE plpgsql    
AS $$
BEGIN
    -- add the news list to the 
    INSERT INTO news_list(markdown_content)
    VALUES(input_markdown);
    
    COMMIT;
END;
$$;