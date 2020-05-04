\c db;

CREATE OR REPLACE FUNCTION add_post(input_id INTEGER, input_markdown TEXT)
RETURNS INTEGER
LANGUAGE plpgsql    
AS $$
DECLARE
    ret_id INTEGER;
BEGIN
    INSERT INTO posts_list (user_id, markdown_content)
    VALUES (input_id, input_markdown)
    RETURNING id INTO ret_id;

    RETURN ret_id;
END;
$$;

CREATE OR REPLACE FUNCTION delete_post(input_id INTEGER)
RETURNS BOOLEAN
LANGUAGE plpgsql    
AS $$
BEGIN
    DELETE FROM posts_list
    WHERE id = input_id;

    IF NOT FOUND THEN 
        return false; 
    END IF;

    RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION update_post(input_post_id INTEGER, input_markdown TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql    
AS $$
BEGIN
    UPDATE posts_list
    SET markdown_content = input_markdown
    WHERE id = input_post_id;

    IF NOT FOUND THEN 
        return false; 
    END IF;

    RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION get_posts(input_id INTEGER)
RETURNS TABLE (
    id INTEGER,
    markdown_content TEXT
)
LANGUAGE plpgsql    
AS $$
BEGIN
    RETURN QUERY
        SELECT pl.id, pl.markdown_content
        FROM posts_list pl
        WHERE user_id = input_id
        ORDER BY time_created DESC;
END;
$$;

CREATE OR REPLACE FUNCTION add_user(input_username VARCHAR(40), input_email VARCHAR(80), input_passwd TEXT)
RETURNS INTEGER
LANGUAGE plpgsql    
AS $$
DECLARE
    ret_id INTEGER;
BEGIN
    INSERT INTO users (username, email, passwd)
    VALUES(input_username, input_email, input_passwd)
    RETURNING id INTO ret_id;

    RETURN ret_id;
END;
$$;